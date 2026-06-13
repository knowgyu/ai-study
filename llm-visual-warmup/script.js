const attentionStep = document.querySelector("#attention-step");
const kvStep = document.querySelector("#kv-step");
const patchStep = document.querySelector("#patch-step");
const attentionViz = document.querySelector("#attention-viz");
const kvViz = document.querySelector("#kv-viz");
const vitViz = document.querySelector("#vit-viz");

function renderAttention() {
  const step = Number(attentionStep.value);
  const tokens = Array.from({ length: 8 }, (_, index) => {
    const tokenNumber = index + 1;
    const active = tokenNumber === step ? "active" : "";
    return `<div class="token ${active}">tok${tokenNumber}</div>`;
  }).join("");

  const scores = Array.from({ length: 8 }, (_, index) => {
    const tokenNumber = index + 1;
    const visible = tokenNumber <= step;
    const value = visible ? (0.18 + (step - tokenNumber + 1) * 0.09).toFixed(2) : "mask";
    return `<div class="score ${visible ? "visible" : "masked"}">${value}</div>`;
  }).join("");

  attentionViz.innerHTML = `
    <div class="token-row">${tokens}</div>
    <div class="score-row">${scores}</div>
    <p class="mini-caption">Query token ${step}은 ${step}개 token만 볼 수 있고, 미래 token은 mask 처리된다.</p>
  `;
}

function renderKv() {
  const step = Number(kvStep.value);
  const cells = Array.from({ length: step }, (_, index) => {
    const n = index + 1;
    return `
      <div class="cache-cell k">K${n}</div>
      <div class="cache-cell v">V${n}</div>
    `;
  }).join("");

  kvViz.innerHTML = `
    ${cells}
    <p class="mini-caption" style="grid-column: 1 / -1">현재 cache에는 ${step}개 token의 K/V가 저장되어 있다.</p>
  `;
}

function renderVit() {
  const visible = Number(patchStep.value);
  const patches = Array.from({ length: 16 }, (_, index) => {
    const n = index + 1;
    return `<div class="patch ${n <= visible ? "visible" : ""}">patch ${n}</div>`;
  }).join("");

  vitViz.innerHTML = patches;
}

const lectureDetails = [
  {
    id: "overview",
    duration: "90분",
    title: "0장 강의 운영: 전체 지도를 먼저 잡고, 세부 개념을 다시 제자리로 돌려놓는다",
    goal: "이 장의 목표는 수강자가 앞으로 나올 PyTorch, Transformer, KV Cache, LoRA, ViT, On-device 키워드를 따로 외우지 않고 하나의 모델 개발 흐름으로 연결해 보는 것이다. 처음부터 수식을 깊게 파기보다, 입력 데이터가 텐서가 되고, 모델을 지나 loss가 되고, 학습과 추론에서 서로 다른 병목이 생긴다는 큰 그림을 세운다.",
    flow: [
      ["0-15분", "과정의 성격 정의: AI 활용 수업이 아니라 구현 감각을 요구하는 압축 과정이라는 점을 합의한다."],
      ["15-35분", "LLM/Vision 모델을 학습 파이프라인, 추론 파이프라인, 배포 파이프라인으로 나눠 지도처럼 그린다."],
      ["35-60분", "Day 1-4의 키워드를 순서대로 배치한다. PyTorch recap이 왜 attention과 LoRA 앞에 놓이는지 설명한다."],
      ["60-80분", "각 키워드의 최소 성공 기준을 정한다. 예를 들어 KV Cache는 'prefill과 decode를 구분해 말할 수 있음'이 최소 기준이다."],
      ["80-90분", "수강 전 체크리스트를 훑고, 부족한 부분을 어느 챕터에서 보강할지 개인 로드맵으로 표시한다."]
    ],
    explain: [
      "초반 강의는 '개념 소개'보다 '코드가 왜 이렇게 생겼는지'를 따라가는 시간이 될 가능성이 높다.",
      "모든 장은 shape literacy를 중심축으로 둔다. 수식은 결국 어떤 텐서가 어떤 차원으로 이동하는지의 압축 표현이다.",
      "학습과 추론을 계속 분리해서 본다. loss/backward/optimizer는 학습의 언어이고, cache/sampling/latency는 추론의 언어다."
    ],
    lab: [
      "본인 노트에 모델 개발 흐름도를 그린다: data -> tensor -> module -> logits -> loss -> backward -> deploy.",
      "각 장마다 '오늘 수업에서 놓치면 안 되는 shape'를 하나씩 적는 표를 만든다."
    ],
    checks: [
      "Transformer를 배우기 전에 PyTorch를 알아야 하는 이유를 코드 관점에서 설명할 수 있는가?",
      "학습 최적화와 추론 최적화가 다른 문제라는 점을 예시로 말할 수 있는가?"
    ]
  },
  {
    id: "pytorch-map",
    duration: "100분",
    title: "1장 강의 운영: PyTorch는 네 가지 부품이 한 학습 루프로 맞물리는 시스템이다",
    goal: "Tensor, Autograd, nn.Module, Dataset/DataLoader, Optimizer가 따로 있는 API가 아니라 하나의 훈련 루프를 구성하는 역할이라는 점을 몸에 익힌다. 강의가 끝나면 작은 모델 하나를 보고 어떤 객체가 입력을 만들고, 어떤 객체가 파라미터를 들고, 어떤 호출이 gradient를 채우는지 분해할 수 있어야 한다.",
    flow: [
      ["0-15분", "NumPy 배열과 torch.Tensor의 차이를 설명한다. device, dtype, requires_grad가 왜 실무에서 중요해지는지 보여준다."],
      ["15-35분", "간단한 linear regression을 코드로 만들고, forward 결과가 loss 하나로 압축되는 과정을 본다."],
      ["35-55분", "loss.backward() 전후로 parameter.grad가 어떻게 채워지는지 출력한다. gradient accumulation 때문에 zero_grad가 필요한 이유를 확인한다."],
      ["55-75분", "nn.Module로 같은 모델을 다시 작성한다. parameter 등록, model.parameters(), state_dict를 확인한다."],
      ["75-100분", "Dataset/DataLoader까지 붙여 mini-batch 학습 루프를 완성하고, LLM 학습 루프와 구조적으로 같은 점을 표시한다."]
    ],
    explain: [
      "Tensor는 데이터 컨테이너이면서 계산 그래프의 노드가 될 수 있다. 이중성이 PyTorch의 핵심이다.",
      "Autograd는 마법이 아니라 forward 때 생긴 연산 기록을 거꾸로 따라가며 chain rule을 적용하는 장치다.",
      "Optimizer는 loss를 직접 보지 않는다. parameter.grad에 쌓인 값만 보고 parameter를 갱신한다.",
      "Module은 layer를 담는 박스가 아니라, 파라미터 탐색과 저장, train/eval 모드 전환의 기준점이다."
    ],
    lab: [
      "y = 3x + 2에 noise를 섞은 데이터를 만들고, Linear 하나로 회귀를 학습한다.",
      "학습 루프 안에 loss, weight, grad norm을 출력해서 값이 어떻게 움직이는지 기록한다.",
      "zero_grad를 일부러 빼고 loss가 이상하게 흔들리는 모습을 관찰한다."
    ],
    checks: [
      "loss.backward()가 parameter 값을 직접 바꾸지 않는다는 사실을 설명할 수 있는가?",
      "model.train()과 optimizer.step()의 역할을 혼동하지 않고 말할 수 있는가?"
    ]
  },
  {
    id: "tensor",
    duration: "90분",
    title: "2장 강의 운영: Transformer 코드는 shape를 읽는 능력으로 절반 이상 이해된다",
    goal: "B, T, C, H, D 같은 차원 이름을 보고 코드의 의도를 추론하는 힘을 기른다. 단순히 view와 transpose 사용법을 외우는 것이 아니라, attention에서 왜 [B,T,C]가 [B,H,T,D]로 바뀌어야 하는지, 어떤 연산이 어느 차원을 섞는지 말할 수 있게 한다.",
    flow: [
      ["0-20분", "Tensor rank와 shape 표기법을 정리한다. scalar, vector, matrix, 3D tensor를 같은 코드로 출력한다."],
      ["20-40분", "view, reshape, transpose, permute, unsqueeze, squeeze를 각각 하나의 예제로 비교한다."],
      ["40-60분", "broadcasting 규칙을 mask와 bias 예제로 설명한다. 편하지만 위험한 이유도 같이 본다."],
      ["60-80분", "attention용 q/k/v shape 변환을 손으로 따라간다. [B,T,3C] -> [B,H,T,D] 과정을 칠판에 쓴다."],
      ["80-90분", "contiguous가 필요한 상황을 transpose 이후 view 예제로 확인하고, 에러 메시지를 읽는 법을 정리한다."]
    ],
    explain: [
      "C는 hidden dimension이고 H는 head 개수, D는 head별 dimension이다. C = H * D 관계가 깨지면 multi-head attention 자체가 성립하지 않는다.",
      "transpose는 데이터를 복사한다기보다 stride 해석을 바꾸는 경우가 많다. 그래서 메모리 연속성 문제가 생긴다.",
      "matmul은 마지막 두 차원을 행렬곱으로 보고 앞 차원은 batch처럼 취급한다. attention score가 [B,H,T,T]가 되는 이유가 여기 있다.",
      "mask는 대부분 broadcasting된다. mask shape가 틀려도 에러 없이 잘못 적용될 수 있으므로 출력 shape를 반드시 확인한다."
    ],
    lab: [
      "torch.randn(2, 4, 12)를 만들고 head 3개로 나누어 [2,3,4,4]로 바꾼다.",
      "q @ k.transpose(-2, -1)의 결과 shape를 예측한 뒤 실제 출력과 비교한다.",
      "잘못된 mask shape를 넣어보고, 왜 에러가 안 나거나 이상한 결과가 나는지 토론한다."
    ],
    checks: [
      "[B,T,C]와 [B,H,T,D]에서 T의 의미가 같은지 설명할 수 있는가?",
      "transpose 후 contiguous를 호출하는 이유를 메모리 관점으로 말할 수 있는가?"
    ]
  },
  {
    id: "autograd",
    duration: "85분",
    title: "3장 강의 운영: Autograd는 계산 그래프와 gradient 저장 위치를 이해하면 투명해진다",
    goal: "requires_grad, leaf tensor, grad accumulation, detach, no_grad의 의미를 실제 학습 루프와 연결한다. 강의 후에는 왜 inference에서 no_grad를 쓰고, 왜 fine-tuning에서 일부 parameter만 requires_grad=True로 두는지 자연스럽게 설명할 수 있어야 한다.",
    flow: [
      ["0-15분", "단일 변수 함수로 backward를 시연한다. y = x^2에서 dy/dx가 어디에 저장되는지 본다."],
      ["15-35분", "행렬곱과 mean loss로 넘어가 chain rule이 여러 연산을 통과하는 모습을 설명한다."],
      ["35-55분", "leaf tensor와 non-leaf tensor의 grad 차이를 확인한다. retain_grad가 필요한 경우를 짧게 언급한다."],
      ["55-70분", "zero_grad를 빼고 gradient가 누적되는 실험을 한다. accumulation이 버그이면서 기능이 되는 경우를 비교한다."],
      ["70-85분", "torch.no_grad(), detach(), eval()의 차이를 정리하고, inference 코드에서 메모리 사용량을 줄이는 이유를 설명한다."]
    ],
    explain: [
      "requires_grad=True는 '이 값에 대한 미분을 추적해 달라'는 표시다. 모든 tensor에 켜는 것이 좋은 습관은 아니다.",
      "loss는 scalar여야 backward가 직관적으로 동작한다. 여러 값의 출력은 어떤 방향으로 줄일지 명시해야 한다.",
      "gradient는 자동으로 초기화되지 않는다. optimizer.zero_grad는 학습 루프의 위생 관리에 가깝다.",
      "detach는 그래프 연결을 끊는다. 강화학습, RNN truncated BPTT, target network 같은 상황에서 자주 중요해진다."
    ],
    lab: [
      "작은 MLP에서 특정 layer만 freeze하고, requires_grad 상태와 grad 값이 어떻게 달라지는지 출력한다.",
      "no_grad 없이 validation을 돌렸을 때와 no_grad로 돌렸을 때의 그래프 생성 차이를 설명한다.",
      "loss.backward를 두 번 호출해보고 retain_graph 관련 에러를 읽는다."
    ],
    checks: [
      "model.eval()이 gradient 계산을 끄는 함수가 아니라는 점을 설명할 수 있는가?",
      "LoRA에서 base weight를 freeze하는 동작을 Autograd 용어로 말할 수 있는가?"
    ]
  },
  {
    id: "module",
    duration: "95분",
    title: "4장 강의 운영: nn.Module은 모델 구조, 파라미터, 저장 포맷을 묶는 계약이다",
    goal: "Module을 단순 class 문법이 아니라 PyTorch 생태계 전체가 기대하는 모델 계약으로 이해한다. __init__에는 학습 가능한 부품과 하위 모듈을 등록하고, forward에는 데이터 흐름을 적는다는 감각을 확실히 만든다.",
    flow: [
      ["0-20분", "plain Python 함수, nn.Linear 직접 호출, nn.Module class를 비교해 왜 Module이 필요한지 확인한다."],
      ["20-40분", "__init__에 등록한 layer가 parameters()와 state_dict()에 자동으로 잡히는 것을 출력한다."],
      ["40-60분", "forward에는 조건문과 여러 입력도 들어갈 수 있음을 보여준다. Module이 꼭 Sequential일 필요는 없다는 점을 강조한다."],
      ["60-80분", "train/eval 모드에 따라 Dropout이 달라지는 예제를 실행한다."],
      ["80-95분", "작은 DecoderBlock을 읽으며 residual, layernorm, attention, MLP가 Module 계층으로 어떻게 묶이는지 분석한다."]
    ],
    explain: [
      "파라미터 등록은 attribute assignment로 일어난다. layer를 local variable로만 만들면 optimizer가 찾지 못한다.",
      "forward는 직접 호출하기보다 model(x)로 호출한다. PyTorch가 hook과 내부 처리를 끼워 넣을 수 있기 때문이다.",
      "state_dict는 모델의 구조가 아니라 파라미터 이름과 tensor 값의 사전이다. 배포와 체크포인트에서 핵심이다.",
      "ModuleList와 ParameterList는 반복 구조를 만들 때 파라미터 누락을 막아주는 안전장치다."
    ],
    lab: [
      "TinyMLP를 class로 만들고, named_parameters()로 각 weight 이름과 shape를 출력한다.",
      "layer를 Python list에 넣었을 때와 nn.ModuleList에 넣었을 때 parameters() 결과가 어떻게 다른지 확인한다.",
      "Dropout이 있는 모델에서 train/eval 모드 출력 차이를 비교한다."
    ],
    checks: [
      "__init__에 layer를 만드는 이유와 forward에서 새 layer를 만들면 안 되는 이유를 설명할 수 있는가?",
      "state_dict만 저장하면 왜 class 정의가 여전히 필요한지 말할 수 있는가?"
    ]
  },
  {
    id: "data-loader",
    duration: "90분",
    title: "5장 강의 운영: 좋은 모델 코드는 좋은 데이터 공급 계약에서 시작한다",
    goal: "Dataset은 sample 단위 계약, DataLoader는 batch 공급 장치라는 역할을 명확히 한다. LLM 학습에서 input과 target이 한 칸 밀리는 구조, collate_fn이 필요한 이유, shuffle과 split의 의미까지 연결한다.",
    flow: [
      ["0-15분", "Dataset의 __len__과 __getitem__ 계약을 설명한다. 인덱스 하나가 sample 하나로 바뀌는 과정을 본다."],
      ["15-35분", "DataLoader가 batch, shuffle, num_workers를 담당하는 이유를 확인한다."],
      ["35-55분", "텍스트를 token id sequence로 보고 block_size 단위 x/y 쌍을 만드는 language modeling dataset을 구현한다."],
      ["55-75분", "길이가 다른 텍스트 batch를 다룰 때 padding과 attention mask가 왜 필요한지 설명한다."],
      ["75-90분", "train/validation/test split, leakage, reproducible seed를 현업 프로젝트 관점에서 정리한다."]
    ],
    explain: [
      "Dataset은 데이터를 모두 메모리에 들고 있을 수도 있고, 파일 경로만 들고 있다가 필요한 순간 읽을 수도 있다.",
      "DataLoader는 모델이 기대하는 batch shape로 데이터를 정리한다. 여기서 shape가 흔들리면 모델 내부 에러가 멀리서 터진다.",
      "LLM의 next-token prediction은 x와 y가 거의 같은 데이터에서 한 칸 차이로 만들어진다. 이 간단한 구조가 대규모 학습의 기본 문제다.",
      "collate_fn은 sample 여러 개를 batch로 묶는 규칙이다. NLP에서는 padding, vision에서는 transform 결과 정렬에 자주 필요하다."
    ],
    lab: [
      "문장 몇 개를 token id로 가정하고 block_size=8인 TextDataset을 만든다.",
      "DataLoader에서 첫 batch의 x/y를 출력하고 y가 x보다 한 칸 미래임을 확인한다.",
      "길이가 다른 sequence를 padding하는 collate_fn을 간단히 작성한다."
    ],
    checks: [
      "Dataset과 DataLoader 중 shuffle을 담당하는 쪽이 무엇인지 말할 수 있는가?",
      "RAG 평가 데이터와 fine-tuning 데이터가 왜 다른 형태를 가져야 하는지 설명할 수 있는가?"
    ]
  },
  {
    id: "transformer",
    duration: "110분",
    title: "6장 강의 운영: Transformer block은 token mixing과 channel mixing을 반복하는 구조다",
    goal: "Decoder-only Transformer의 전체 경로를 token id부터 logits까지 따라간다. Self-attention은 token 사이 정보를 섞고, MLP는 각 token의 hidden representation을 변환하며, residual과 LayerNorm이 깊은 네트워크를 안정화한다는 감각을 만든다.",
    flow: [
      ["0-20분", "token id가 embedding table 조회로 vector가 되는 과정을 설명한다. position embedding이 필요한 이유를 함께 다룬다."],
      ["20-45분", "DecoderBlock 하나를 크게 그린다. LayerNorm, Self-Attention, residual, MLP, residual 순서를 따라간다."],
      ["45-65분", "Pre-norm과 post-norm 차이를 직관적으로 설명한다. 최신 LLM에서 pre-norm이 자주 쓰이는 이유를 안정성 관점으로 본다."],
      ["65-85분", "마지막 hidden state가 vocab logits로 바뀌고 cross entropy loss로 연결되는 과정을 본다."],
      ["85-110분", "작은 block 코드를 읽으며 각 줄 옆에 input/output shape를 적는다."]
    ],
    explain: [
      "Embedding은 one-hot vector에 거대한 matrix를 곱하는 것과 같은 효과지만, 실제로는 table lookup으로 구현된다.",
      "Self-attention은 token 간 관계를 섞는다. MLP는 같은 token 내부의 channel 정보를 비선형으로 바꾼다.",
      "Residual connection은 원래 정보를 보존하면서 변화량을 더하게 해 깊은 모델 학습을 돕는다.",
      "LayerNorm은 hidden dimension 기준 정규화다. BatchNorm과 달리 sequence 모델에서 batch 크기에 덜 민감하다.",
      "Causal decoder는 미래 token을 보지 못하게 막아야 다음 token 예측 문제로 학습된다."
    ],
    lab: [
      "vocab_size=100, dim=32, block_size=16인 작은 decoder skeleton을 만들고 각 단계 shape를 출력한다.",
      "position embedding을 제거했을 때 모델이 순서를 알 수 없는 이유를 toy 예제로 설명한다.",
      "logits [B,T,V]와 target [B,T]가 cross entropy에 들어갈 때 reshape가 왜 필요한지 확인한다."
    ],
    checks: [
      "Attention과 MLP가 각각 어떤 차원의 정보를 섞는지 구분할 수 있는가?",
      "Residual을 빼면 깊은 Transformer에서 어떤 문제가 생길 수 있는지 말할 수 있는가?"
    ]
  },
  {
    id: "attention",
    duration: "110분",
    title: "7장 강의 운영: Attention은 검색처럼 보이지만, 미분 가능한 가중 평균이다",
    goal: "Q, K, V의 역할을 비유로만 끝내지 않고 실제 행렬 연산으로 연결한다. score 계산, scaling, causal mask, softmax, weighted sum, multi-head split까지 직접 shape를 따라가며 구현한다.",
    flow: [
      ["0-20분", "한 token이 다른 token들을 얼마나 참고할지 정하는 문제로 attention을 소개한다."],
      ["20-45분", "QK^T score 계산을 손으로 해본다. 왜 결과가 [T,T] 관계 행렬인지 설명한다."],
      ["45-60분", "sqrt(D)로 나누는 scaling을 다룬다. dot product 크기가 커지면 softmax가 너무 뾰족해지는 문제를 설명한다."],
      ["60-80분", "causal mask를 적용하고 softmax 이후 미래 token weight가 0이 되는 것을 확인한다."],
      ["80-100분", "multi-head로 나누는 이유를 다양성 관점에서 설명한다. head마다 다른 관계 패턴을 볼 수 있음을 보여준다."],
      ["100-110분", "PyTorch의 scaled_dot_product_attention과 직접 구현의 대응 관계를 정리한다."]
    ],
    explain: [
      "Query는 현재 token이 찾는 관점, Key는 각 token이 가진 주소, Value는 실제로 섞일 내용이다.",
      "Softmax는 score를 확률처럼 보이는 가중치로 바꾼다. 이 가중치로 V를 평균내면 context vector가 된다.",
      "Causal mask는 학습 데이터 누수를 막는 장치다. decoder가 미래 정답을 보면 next-token prediction이 무너진다.",
      "Attention의 시간/메모리 비용은 T^2에 비례한다. long context가 어려운 가장 큰 이유 중 하나다.",
      "Multi-head는 같은 문장을 여러 관계 공간에서 동시에 읽게 한다. 모든 head가 항상 해석 가능한 것은 아니다."
    ],
    lab: [
      "T=4, D=3인 작은 q/k/v를 만들고 scores, weights, out을 직접 출력한다.",
      "mask 적용 전후 softmax weight를 비교한다.",
      "head 수를 바꿀 때 C % H 조건이 왜 필요한지 실험한다."
    ],
    checks: [
      "QK^T의 결과가 왜 token-to-token 관계표인지 설명할 수 있는가?",
      "KV Cache가 왜 attention의 K/V에서 출발하는 최적화인지 연결할 수 있는가?"
    ]
  },
  {
    id: "generation",
    duration: "100분",
    title: "8장 강의 운영: Generation은 모델 구조보다 추론 시스템의 병목을 더 많이 드러낸다",
    goal: "학습 forward와 실제 생성 루프의 차이를 분리한다. prefill/decode, KV Cache, temperature, top-k/top-p, latency, memory trade-off를 하나의 추론 파이프라인으로 이해한다.",
    flow: [
      ["0-20분", "학습 시에는 전체 sequence를 한 번에 처리하지만, 생성 시에는 token을 하나씩 추가한다는 차이를 설명한다."],
      ["20-40분", "prefill과 decode를 분리한다. prompt 전체를 처리하는 단계와 새 token 하나를 처리하는 단계가 왜 다른지 본다."],
      ["40-60분", "KV Cache가 없을 때 같은 prefix를 반복 계산하는 문제를 그림으로 보여준다."],
      ["60-80분", "sampling 전략을 다룬다. greedy, temperature, top-k, top-p가 답변 다양성과 안정성을 어떻게 바꾸는지 비교한다."],
      ["80-100분", "cache memory 계산식을 소개하고, batch serving과 on-device inference에서 어떤 병목이 커지는지 정리한다."]
    ],
    explain: [
      "KV Cache는 이전 token들의 Key와 Value를 layer별로 저장한다. 새 token은 Query만 새로 만들고 과거 K/V를 재사용한다.",
      "prefill은 병렬성이 크지만 decode는 순차성이 강하다. 그래서 긴 답변 생성에서는 token latency가 체감 성능을 좌우한다.",
      "temperature가 낮으면 분포가 날카로워지고, 높으면 다양한 token이 선택될 가능성이 커진다.",
      "top-p는 누적 확률 기준으로 후보 집합을 자른다. 고정 개수인 top-k보다 문맥에 따라 유연하다.",
      "KV Cache는 속도를 얻는 대신 메모리를 쓴다. context length, layer 수, head 수, dtype이 모두 비용에 영향을 준다."
    ],
    lab: [
      "작은 vocab logits에 temperature를 적용하고 softmax 분포 변화를 출력한다.",
      "greedy와 sampling 결과가 어떻게 달라지는지 toy 예제로 비교한다.",
      "layer=24, heads=16, head_dim=64, context=4096, fp16일 때 KV cache 대략 크기를 계산한다."
    ],
    checks: [
      "prefill과 decode를 같은 forward라고 부르더라도 시스템 관점에서 왜 다르게 다뤄야 하는가?",
      "KV Cache가 속도를 높이지만 메모리를 늘리는 이유를 수식 없이 설명할 수 있는가?"
    ]
  },
  {
    id: "lora",
    duration: "100분",
    title: "9장 강의 운영: LoRA는 큰 weight를 직접 바꾸지 않고 변화량만 학습하는 방법이다",
    goal: "Full fine-tuning, feature extraction, adapter tuning, LoRA의 차이를 비교한다. LoRA의 핵심인 low-rank update, rank/alpha/dropout/target module 선택, merge 개념을 실제 fine-tuning 의사결정과 연결한다.",
    flow: [
      ["0-20분", "모델 전체를 학습할 때 필요한 메모리와 저장 비용을 설명하고, parameter-efficient tuning의 필요성을 제시한다."],
      ["20-40분", "W + BA 구조를 그림으로 설명한다. rank가 작으면 학습 파라미터가 얼마나 줄어드는지 계산한다."],
      ["40-60분", "q_proj, v_proj, o_proj, MLP 등 target module 선택이 결과와 비용에 미치는 영향을 비교한다."],
      ["60-80분", "LoRA hyperparameter인 r, alpha, dropout을 다룬다. 너무 작은 rank와 너무 큰 rank의 trade-off를 설명한다."],
      ["80-100분", "QLoRA, merge_and_unload, adapter 저장/교체를 배포 관점에서 정리한다."]
    ],
    explain: [
      "LoRA는 base weight를 freeze하고 작은 A/B 행렬만 학습한다. Autograd 관점에서는 대부분의 requires_grad를 끄는 셈이다.",
      "low-rank라는 말은 모든 변화를 큰 행렬 전체로 표현하지 않고 작은 차원의 곱으로 근사한다는 뜻이다.",
      "rank r이 커지면 표현력은 늘지만 학습 파라미터와 메모리도 늘어난다.",
      "alpha는 LoRA update의 스케일을 조절한다. 같은 rank라도 alpha 설정에 따라 update 영향이 달라진다.",
      "merge는 추론 편의를 위해 base weight와 LoRA update를 합치는 과정이다. 여러 adapter를 갈아 끼우려면 merge하지 않고 유지하는 전략도 가능하다."
    ],
    lab: [
      "Linear(in=1024, out=1024) 하나를 full fine-tuning할 때와 LoRA r=8일 때 학습 파라미터 수를 비교한다.",
      "base layer weight의 requires_grad를 False로 두고 A/B만 optimizer에 들어가는지 확인한다.",
      "target module을 q_proj/v_proj만 선택한 경우와 all-linear에 가까운 선택의 비용 차이를 표로 정리한다."
    ],
    checks: [
      "LoRA가 학습 시간을 줄이는 이유와 저장 용량을 줄이는 이유를 구분해 설명할 수 있는가?",
      "rank를 무조건 크게 잡는 것이 좋은 선택이 아닌 이유를 말할 수 있는가?"
    ]
  },
  {
    id: "data",
    duration: "100분",
    title: "10장 강의 운영: Data와 평가는 모델 성능을 실제 업무 성과로 바꾸는 장치다",
    goal: "학습 데이터, 검색 데이터, 평가 데이터가 서로 다른 목적과 품질 기준을 가진다는 점을 이해한다. 좋은 모델을 고르는 문제가 아니라, 실패를 재현하고 개선을 측정할 수 있는 데이터 체계를 만드는 문제로 시야를 넓힌다.",
    flow: [
      ["0-20분", "training, retrieval, evaluation data를 각각 정의한다. 같은 문서도 목적에 따라 다른 형태로 가공된다는 점을 보여준다."],
      ["20-40분", "instruction tuning sample schema를 다룬다. instruction/input/output의 경계가 흐리면 어떤 문제가 생기는지 본다."],
      ["40-60분", "RAG에서 chunking, metadata, embedding, reranking, access control이 검색 품질에 미치는 영향을 설명한다."],
      ["60-80분", "평가셋 설계를 다룬다. leakage, golden answer, expected context, negative case, regression set을 구분한다."],
      ["80-100분", "자동 평가와 사람 평가의 장단점을 비교하고, 현업 프로젝트에서 최소 평가 루프를 설계한다."]
    ],
    explain: [
      "데이터 품질은 모델 구조보다 더 직접적으로 결과를 바꿀 때가 많다. 특히 사내 문서/RAG에서는 chunk와 metadata가 성능의 큰 부분이다.",
      "평가 데이터는 학습 데이터보다 보수적으로 다뤄야 한다. 누수되면 개선처럼 보이는 착시가 생긴다.",
      "RAG 평가는 retrieval과 generation을 분리해서 봐야 한다. 검색이 틀렸는지, 답변 생성이 틀렸는지 분리해야 고칠 수 있다.",
      "정답이 하나가 아닌 작업은 rubric 기반 평가가 필요하다. 요약, 이메일 작성, 질의응답은 단순 exact match로 부족하다.",
      "현업에서는 실패 케이스를 버리지 않고 regression set으로 모으는 습관이 중요하다."
    ],
    lab: [
      "같은 업무 문서 하나를 fine-tuning sample, RAG chunk, evaluation question 세 형태로 변환한다.",
      "RAG 질문 5개에 대해 expected_context_ids와 reference_answer를 직접 작성한다.",
      "검색 실패, 근거 부족, hallucination, format violation을 구분하는 오류 taxonomy를 만든다."
    ],
    checks: [
      "검색 품질 문제와 생성 품질 문제를 어떻게 분리해서 진단할 수 있는가?",
      "평가셋 leakage가 왜 실제 성능을 과대평가하게 만드는지 설명할 수 있는가?"
    ]
  },
  {
    id: "vit",
    duration: "95분",
    title: "11장 강의 운영: ViT는 이미지를 patch token sequence로 바꾸어 Transformer에 넣는다",
    goal: "CNN을 모르는 상태에서도 ViT의 핵심 아이디어를 이해하도록, 이미지를 격자로 자르고 각 patch를 embedding으로 바꾸는 흐름을 텍스트 Transformer와 연결한다. patch size, token 수, positional embedding, class token, fine-tuning 관점을 다룬다.",
    flow: [
      ["0-20분", "이미지를 [C,H,W] tensor로 보고, patch로 자르면 몇 개의 token이 생기는지 계산한다."],
      ["20-40분", "Conv2d로 patch embedding을 구현하는 이유를 설명한다. kernel_size와 stride가 patch_size와 같을 때의 의미를 본다."],
      ["40-60분", "class token과 position embedding을 붙여 Transformer encoder 입력을 만드는 과정을 정리한다."],
      ["60-80분", "patch size trade-off를 다룬다. patch가 작으면 token 수가 늘고 attention 비용이 커진다."],
      ["80-95분", "pretrained ViT fine-tuning에서 augmentation, head 교체, frozen backbone 전략을 비교한다."]
    ],
    explain: [
      "ViT의 큰 발상은 이미지를 단어처럼 쪼개 sequence로 다루는 것이다. patch 하나가 텍스트의 token과 비슷한 역할을 한다.",
      "224x224 이미지를 16x16 patch로 자르면 14x14, 즉 196개 patch token이 된다.",
      "class token은 전체 이미지를 대표하는 위치로 학습된다. 마지막 layer의 class token hidden state로 분류 head를 통과시키는 방식이 흔하다.",
      "position embedding이 없으면 patch의 위치 정보가 약해진다. Transformer는 기본적으로 순서를 자체적으로 알지 못한다.",
      "ViT는 데이터가 충분할 때 강력하지만, 작은 데이터에서는 augmentation과 pretrained weight 활용이 중요하다."
    ],
    lab: [
      "image_size=224, patch_size=16일 때 patch 개수를 계산하고, patch_size=32와 attention 비용을 비교한다.",
      "Conv2d patch embedding 코드의 출력 shape [B,D,H/P,W/P] -> [B,N,D]를 직접 출력한다.",
      "텍스트 Transformer의 token embedding과 ViT patch embedding의 대응 관계를 표로 만든다."
    ],
    checks: [
      "ViT에서 patch size를 줄이면 왜 비용이 빠르게 늘어나는가?",
      "class token과 position embedding이 각각 어떤 문제를 해결하는지 설명할 수 있는가?"
    ]
  },
  {
    id: "onedvice",
    duration: "110분",
    title: "12장 강의 운영: On-device AI는 정확도보다 먼저 memory, latency, power budget을 묻는다",
    goal: "모델을 만든 뒤 어디에서 돌릴 것인지가 구조 선택을 바꾼다는 점을 이해한다. parameter memory, activation memory, KV cache memory, quantization, pruning, distillation, ONNX export, runtime profiling을 한 번에 연결한다.",
    flow: [
      ["0-20분", "cloud GPU, desktop CPU, mobile NPU, embedded device의 제약을 비교한다. 같은 모델도 실행 환경이 바뀌면 문제가 달라진다."],
      ["20-45분", "모델 메모리를 계산한다. parameter 수와 dtype으로 FP32/FP16/INT8 크기를 대략 산출한다."],
      ["45-65분", "activation memory와 KV cache memory를 구분한다. 학습과 추론에서 메모리 병목이 다르게 생김을 본다."],
      ["65-85분", "quantization, pruning, distillation을 각각 설명한다. 정확도, 속도, 호환성 trade-off를 비교한다."],
      ["85-110분", "ONNX, TensorRT, TFLite, ExecuTorch 같은 배포 경로를 지도처럼 보고, profiling으로 병목을 찾는 순서를 정리한다."]
    ],
    explain: [
      "On-device에서는 평균 latency보다 tail latency와 발열, 배터리, 메모리 피크가 중요해질 수 있다.",
      "FP16은 FP32 대비 weight memory를 절반으로 줄이고, INT8은 대략 1/4 수준까지 줄인다. 하지만 연산 지원과 정확도 영향이 따라온다.",
      "Quantization은 숫자 표현을 줄이는 방법이고, distillation은 큰 모델의 행동을 작은 모델에 가르치는 방법이다.",
      "ONNX export는 끝이 아니라 시작이다. export 가능한 연산, dynamic shape, runtime별 지원 차이를 확인해야 한다.",
      "실무 최적화는 추측보다 profiling이 먼저다. 어디가 느린지 모르면 모델을 줄여도 체감 개선이 작을 수 있다."
    ],
    lab: [
      "1B parameter 모델의 FP32, FP16, INT8 weight memory를 대략 계산한다.",
      "context length가 2배가 될 때 KV cache memory가 어떻게 변하는지 표로 만든다.",
      "배포 체크리스트를 작성한다: target device, runtime, max latency, memory cap, fallback path, accuracy tolerance."
    ],
    checks: [
      "Quantization과 distillation의 목적과 방식 차이를 설명할 수 있는가?",
      "모델이 느릴 때 가장 먼저 해야 할 일이 코드 수정이 아니라 profiling인 이유를 말할 수 있는가?"
    ]
  }
];

function renderLectureDetails() {
  for (const detail of lectureDetails) {
    const section = document.getElementById(detail.id);
    if (!section || section.querySelector(".lecture-detail")) continue;

    const flow = detail.flow.map(([time, text]) => `<li><time>${time}</time><span>${text}</span></li>`).join("");
    const explain = detail.explain.map((item) => `<li>${item}</li>`).join("");
    const lab = detail.lab.map((item) => `<li>${item}</li>`).join("");
    const checks = detail.checks.map((item) => `<li>${item}</li>`).join("");

    section.insertAdjacentHTML("beforeend", `
      <div class="lecture-detail">
        <div class="lecture-title">
          <div>
            <p class="eyebrow">Deep lecture notes</p>
            <h3>${detail.title}</h3>
          </div>
          <span class="duration">${detail.duration}</span>
        </div>
        <p class="lecture-goal">${detail.goal}</p>
        <div class="lecture-panel">
          <h4>강의 흐름</h4>
          <ol class="lecture-flow">${flow}</ol>
        </div>
        <div class="lecture-grid">
          <div class="lecture-panel">
            <h4>핵심 설명 포인트</h4>
            <ul>${explain}</ul>
          </div>
          <div class="lecture-panel lecture-lab">
            <h4>라이브 코딩 / 실습</h4>
            <ul>${lab}</ul>
          </div>
          <div class="lecture-panel lecture-check">
            <h4>수강 후 체크 질문</h4>
            <ul>${checks}</ul>
          </div>
          <div class="lecture-panel">
            <h4>강사 메모</h4>
            <ul>
              <li>이 장은 개념 정의보다 입력과 출력 shape를 계속 말하게 만드는 방식으로 운영한다.</li>
              <li>예제 코드는 완성본을 보여주기보다 한 줄씩 실행하며 중간 tensor를 확인한다.</li>
              <li>마지막 10분은 수강자가 자기 말로 설명하도록 짧은 복원 질문을 던진다.</li>
            </ul>
          </div>
        </div>
      </div>
    `);
  }
}

attentionStep.addEventListener("input", renderAttention);
kvStep.addEventListener("input", renderKv);
patchStep.addEventListener("input", renderVit);

renderAttention();
renderKv();
renderVit();
renderLectureDetails();
