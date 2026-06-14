window.AI_STUDY_CURRICULUM = [
  {
    "id": "overview",
    "stage": "오리엔테이션",
    "title": "AI 모델 내부 학습 로드맵",
    "oneLiner": "API 호출 결과만 보는 단계에서 token, tensor, attention, 추론 비용을 읽는 단계로 넘어간다.",
    "whyNow": "이 교안은 이전 내용을 전부 기억한다는 전제를 두지 않는다. 필요한 앱 레이어 개념을 짧게 복습하고, 곧바로 모델 내부 계산으로 이어지게 구성한다.",
    "prerequisites": [],
    "learningGoals": [
      "AI 모델 내부 학습 로드맵의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "AI 모델 내부 학습 로드맵의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "먼저 학습 순서를 잡고, 각 장에서 입력·출력·비용 기준을 확인한다.",
      "flow": "앱 레이어 복습 → Tensor/Autograd/Module → Transformer → 추론·튜닝 → Vision → On-device",
      "shape": "모든 장은 [data]→[B,T,C]→logits→loss 또는 token latency로 연결된다."
    },
    "sections": [
      {
        "heading": "강의 흐름",
        "body": "19개 장을 통해 PyTorch 기본기, Transformer 구현, inference 최적화, LoRA, data/eval, ViT, on-device 흐름을 하나의 로드맵으로 묶는다.",
        "bullets": [
          "코드 암기보다 shape 추적",
          "학습과 추론 병목 분리",
          "출처 기반 복습"
        ]
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "모델 내부를 공부할 때는 용어를 외우기보다 데이터가 어떤 모양으로 들어가고 어떤 비용으로 나오는지 추적한다.",
        "bullets": [
          "사용자 입력 → 토큰화 → tensor → embedding → attention/MLP 반복 → logits → 디코딩",
          "문장 하나는 token id [T], 묶음 처리는 [B,T], 모델 내부 표현은 [B,T,C]로 읽는다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "사용자 입력",
          "토큰화",
          "tensor",
          "embedding",
          "attention/MLP 반복",
          "logits",
          "디코딩"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "text = \"오늘 배울 내용\"\nids = tokenizer.encode(text)        # 길이 T의 정수 목록\nx = embedding(torch.tensor(ids))    # [T, C]\nlogits = model(x.unsqueeze(0))      # [1, T, V]"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "API 결과만 보고 내부 계산을 생략하면 오류 원인을 찾기 어렵다.",
          "학습 속도와 답변 속도는 병목이 다르다.",
          "각 장의 기호 B,T,C,V를 매번 다시 확인한다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "개인 로드맵 그리기",
      "steps": [
        "아는 주제와 낯선 주제를 표시한다.",
        "각 장의 최소 성공 문장을 한 줄로 쓴다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "전체 과정이 앱 개발, 모델 구현, 배포 최적화로 이어진다는 그림을 얻는다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "모델 내부 학습을 화면 구현이나 서비스 포장 문제로만 보면 tensor shape, gradient, attention 비용을 놓친다."
    ],
    "checks": [
      "API 호출과 모델 forward의 차이를 구분할 수 있는가?",
      "학습 비용과 추론 비용이 왜 다른지 예를 들 수 있는가?",
      "이전 앱 레이어 개념 중 다시 봐야 할 것을 표시했는가?"
    ],
    "next": [
      "app-bridge"
    ],
    "sources": [
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      },
      {
        "label": "PyTorch Learn the Basics",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        "type": "official",
        "note": "Tensor, autograd, model, DataLoader 학습 순서의 공식 기준"
      }
    ]
  },
  {
    "id": "app-bridge",
    "stage": "오리엔테이션",
    "title": "Agent·RAG·LangGraph 기초 복습과 모델 내부",
    "oneLiner": "Agent와 RAG는 모델 주변의 실행 흐름이고, 이 장에서는 그 아래의 token 계산과 구분해서 본다.",
    "whyNow": "이전에 배운 앱 레이어를 완전히 기억하지 못해도 이후 장을 읽을 수 있도록, 검색·도구·구조화 출력과 모델 forward의 경계를 다시 잡는다.",
    "prerequisites": [],
    "learningGoals": [
      "Agent·RAG·LangGraph 기초 복습과 모델 내부의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Agent·RAG·LangGraph 기초 복습과 모델 내부의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "앱 레이어는 모델을 호출하고 검증하는 흐름이고, 모델 내부는 token ids를 받아 logits를 만드는 계산이다.",
      "flow": "User → retriever/tool graph → model tokens → structured answer → evaluator",
      "shape": "문서는 chunk list, 모델 입력은 token ids [B,T], 출력은 logits [B,T,V]다."
    },
    "sections": [
      {
        "heading": "이전에 배운 앱 레이어를 다시 정리하기",
        "body": "RAG, Agent, LangGraph를 자세히 기억하지 못해도 괜찮다. 이후 장에서 필요한 것은 이들이 모델 내부 layer가 아니라 모델을 둘러싼 실행 흐름이라는 점이다.",
        "bullets": [
          "RAG 품질: 검색/컨텍스트/평가",
          "모델 품질: 데이터/파라미터/추론 설정"
        ]
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "RAG나 agent는 모델을 감싸는 실행 절차이고, nn.Module 내부 layer가 아니다. 검색 품질과 생성 품질을 분리해야 디버깅이 가능하다.",
        "bullets": [
          "질문 → 검색/도구 선택 → 컨텍스트 구성 → 모델 forward → 형식 검증/평가",
          "검색 결과는 문서 목록, 모델 입력은 token ids [B,T], 모델 출력은 어휘 점수 logits [B,T,V]다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "질문",
          "검색/도구 선택",
          "컨텍스트 구성",
          "모델 forward",
          "형식 검증/평가"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "docs = retriever.search(query)\ncontext = \"\n\".join(d.text for d in docs[:3])\nids = tokenizer.encode(context + \"\n\" + query)\n# 이후부터는 일반 언어 모델 forward 문제로 바뀐다."
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "검색 결과가 비어 있는데 모델만 바꾸려 하면 문제가 해결되지 않는다.",
          "형식이 맞는 답변이 항상 사실인 것은 아니다.",
          "도구 실행 흐름과 모델 layer를 같은 것으로 보지 않는다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "RAG 실패 분류표",
      "steps": [
        "최근 만든 RAG 예제를 떠올린다.",
        "검색 실패, 컨텍스트 구성 실패, model decoding 실패로 나눈다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "앱 레이어 문제와 모델 내부 문제를 분리한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "Agent를 쓰면 모델 내부 이해가 필요 없어질 것이라고 오해하기 쉽다."
    ],
    "checks": [
      "RAG evaluation과 fine-tuning evaluation의 차이를 말할 수 있는가?",
      "LangGraph 노드와 nn.Module layer를 혼동하지 않는가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "tensor-shape"
    ],
    "sources": [
      {
        "label": "LangGraph Documentation",
        "url": "https://langchain-ai.github.io/langgraph/",
        "type": "official",
        "note": "Agent/RAG orchestration을 모델 내부 학습과 분리해 보는 기준"
      },
      {
        "label": "OpenAI Structured Outputs",
        "url": "https://platform.openai.com/docs/guides/structured-outputs",
        "type": "official",
        "note": "구조화 출력과 앱 레이어 평가 연결"
      }
    ]
  },
  {
    "id": "tensor-shape",
    "stage": "PyTorch 기초",
    "title": "Tensor와 shape 읽기",
    "oneLiner": "Transformer 코드는 shape를 읽으면 절반 이상 보인다.",
    "whyNow": "attention, embedding, ViT patch 모두 차원 변환이 핵심이므로 먼저 B/T/C/H/D 언어를 익힌다.",
    "prerequisites": [
      "Python",
      "배열/행렬 기초"
    ],
    "learningGoals": [
      "Tensor와 shape 읽기의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Tensor와 shape 읽기의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "shape 표기는 코드의 타입 정보처럼 읽는다. 축 이름이 바뀌면 연산 의미도 바뀐다.",
      "flow": "[B,T,C] → split heads [B,H,T,D] → score [B,H,T,T]",
      "shape": "B=batch, T=tokens, C=hidden, H=heads, D=head_dim"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "view, reshape, transpose, permute는 데이터를 보는 관점을 바꾼다. attention에서는 hidden C를 head H와 D로 나누는 순간이 중요하다.",
        "code": "x = torch.randn(B, T, C)\nqkv = linear(x).view(B, T, 3, H, D)\nq, k, v = qkv.unbind(dim=2)\nq = q.transpose(1, 2)  # [B, H, T, D]"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "Tensor는 숫자 배열이고 shape는 그 배열의 축 의미다. PyTorch 초보자는 값보다 먼저 축 이름을 적는 습관을 들이면 좋다.",
        "bullets": [
          "원본 batch → embedding [B,T,C] → head 분리 [B,H,T,D] → attention score [B,H,T,T]",
          "B=batch, T=token 수, C=hidden 크기, H=head 수, D=head별 크기이며 보통 C=H×D다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "원본 batch",
          "embedding [B,T,C]",
          "head 분리 [B,H,T,D]",
          "attention score [B,H,T,T]"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "import torch\nB,T,C,H = 2,4,12,3\nD = C // H\nx = torch.randn(B,T,C)\nheads = x.view(B,T,H,D).transpose(1,2)\nprint(heads.shape)  # torch.Size([2, 3, 4, 4])"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "view 전에 메모리 연속성이 깨졌으면 contiguous가 필요할 수 있다.",
          "shape가 맞아도 축 순서가 틀리면 조용히 나쁜 결과가 나온다.",
          "broadcast는 편하지만 mask 오류를 숨길 수 있다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Head split 실습",
      "steps": [
        "torch.randn(2,4,12)를 만든다.",
        "head=3으로 [2,3,4,4]를 만든다.",
        "transpose 전후 stride를 출력한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "shape 출력만으로 attention 코드 의도를 추론한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "reshape는 항상 안전하고 의미 보존된다고 오해하기 쉽다."
    ],
    "checks": [
      "[B,T,C]에서 T와 C의 역할을 구분하는가?",
      "mask shape가 틀리면 어떤 문제가 생기는가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "autograd-loop"
    ],
    "sources": [
      {
        "label": "PyTorch Tensors",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html",
        "type": "official",
        "note": "Tensor shape, dtype, device 기본 동작"
      },
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      }
    ]
  },
  {
    "id": "autograd-loop",
    "stage": "PyTorch 기초",
    "title": "Autograd와 학습 루프",
    "oneLiner": "forward는 loss를 만들고 backward는 parameter.grad를 채운다.",
    "whyNow": "LoRA와 fine-tuning은 결국 어떤 파라미터에 gradient를 허용할지 결정하는 문제다.",
    "prerequisites": [
      "tensor-shape"
    ],
    "learningGoals": [
      "Autograd와 학습 루프의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Autograd와 학습 루프의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "Autograd는 forward 계산 그래프를 저장하고 backward에서 parameter.grad를 채운다.",
      "flow": "forward → loss → zero_grad → backward → step",
      "shape": "logits [B,T,V], target [B,T], loss scalar"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "requires_grad가 켜진 leaf parameter는 backward 뒤 .grad를 가진다. optimizer는 loss가 아니라 grad만 보고 값을 갱신한다.",
        "code": "for x, y in loader:\n    logits = model(x)\n    loss = F.cross_entropy(logits.view(-1, V), y.view(-1))\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "Autograd는 loss에서 출발해 계산 그래프를 거꾸로 따라가며 각 파라미터의 gradient를 채운다.",
        "bullets": [
          "batch → forward → loss → zero_grad → backward → optimizer.step → 기록",
          "모델 출력 logits [B,T,V]와 정답 y [B,T]를 loss 함수가 비교해 scalar loss를 만든다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "batch",
          "forward",
          "loss",
          "zero_grad",
          "backward",
          "optimizer.step",
          "기록"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "optimizer.zero_grad()\nlogits = model(input_ids)\nloss = torch.nn.functional.cross_entropy(logits.view(-1, V), targets.view(-1))\nloss.backward()\noptimizer.step()"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "zero_grad를 빼면 이전 gradient가 누적된다.",
          "loss.backward 뒤에 바로 step을 하지 않으면 파라미터가 바뀌지 않는다.",
          "평가 중에는 torch.no_grad를 써서 불필요한 그래프 생성을 막는다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Gradient 출력",
      "steps": [
        "Linear 회귀를 만든다.",
        "backward 전후 weight.grad를 출력한다.",
        "zero_grad를 빼고 차이를 본다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "학습 루프의 위생 규칙을 이해한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "loss.backward가 파라미터 값을 직접 바꾼다고 오해하기 쉽다."
    ],
    "checks": [
      "no_grad와 eval의 차이를 설명하는가?",
      "LoRA freeze를 autograd 용어로 설명하는가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "module-state"
    ],
    "sources": [
      {
        "label": "PyTorch Autograd",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html",
        "type": "official",
        "note": "requires_grad, backward, no_grad 설명"
      },
      {
        "label": "PyTorch Learn the Basics",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        "type": "official",
        "note": "Tensor, autograd, model, DataLoader 학습 순서의 공식 기준"
      }
    ]
  },
  {
    "id": "module-state",
    "stage": "PyTorch 기초",
    "title": "nn.Module, state_dict, train/eval",
    "oneLiner": "Module은 모델 구조와 파라미터 저장 계약이다.",
    "whyNow": "Transformer block, LoRA adapter, checkpoint 로딩은 모두 Module/state_dict 관습 위에 있다.",
    "prerequisites": [
      "autograd-loop"
    ],
    "learningGoals": [
      "nn.Module, state_dict, train/eval의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "nn.Module, state_dict, train/eval의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "Module은 layer 등록, forward 계약, state_dict 저장 규칙을 묶는 단위다.",
      "flow": "__init__ registers layers → forward connects flow → state_dict saves tensors",
      "shape": "각 named_parameter는 weight shape와 gradient 상태를 가진다."
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "__init__에 layer를 attribute로 등록하면 parameters()와 state_dict()에 잡힌다. forward는 데이터 흐름만 적는다.",
        "code": "class Block(nn.Module): def __init__(self): super().__init__() self.attn = SelfAttention() self.mlp = MLP() def forward(self, x): x = x + self.attn(norm(x)) return x + self.mlp(norm(x))"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "nn.Module은 파라미터와 forward 규칙을 한 곳에 묶는 단위다. state_dict는 학습된 숫자들을 저장하는 표준 방식이다.",
        "bullets": [
          "__init__에서 layer 정의 → forward에서 계산 연결 → state_dict 저장/로드 → train/eval 모드 전환",
          "Linear는 마지막 축을 변환한다. 예를 들어 [B,T,C]에 Linear(C,V)를 적용하면 [B,T,V]가 된다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "__init__에서 layer 정의",
          "forward에서 계산 연결",
          "state_dict 저장/로드",
          "train/eval 모드 전환"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "class TinyHead(torch.nn.Module):\n    def __init__(self, C, V):\n        super().__init__()\n        self.proj = torch.nn.Linear(C, V)\n    def forward(self, x):\n        return self.proj(x)  # [B,T,C] -> [B,T,V]"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "Module을 만들고 forward를 호출하지 않으면 계산은 일어나지 않는다.",
          "model.eval은 gradient를 끄지 않는다. 평가에서는 no_grad도 함께 쓴다.",
          "state_dict에는 코드 구조가 아니라 tensor 값이 들어간다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Parameter 등록 확인",
      "steps": [
        "TinyMLP를 만든다.",
        "named_parameters를 출력한다.",
        "Python list와 ModuleList 차이를 비교한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "파라미터 누락 버그를 피한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "forward 안에서 새 layer를 만들면 학습된다고 오해하기 쉽다."
    ],
    "checks": [
      "state_dict만으로 모델 구조가 복원되는가?",
      "train/eval이 필요한 layer 예시는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "dataset-loader"
    ],
    "sources": [
      {
        "label": "PyTorch Build the Neural Network",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
        "type": "official",
        "note": "nn.Module과 forward 계약"
      },
      {
        "label": "PyTorch Learn the Basics",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        "type": "official",
        "note": "Tensor, autograd, model, DataLoader 학습 순서의 공식 기준"
      }
    ]
  },
  {
    "id": "dataset-loader",
    "stage": "PyTorch 기초",
    "title": "Dataset, DataLoader, collate, split",
    "oneLiner": "좋은 학습 루프는 안정적인 batch 공급 계약에서 시작한다.",
    "whyNow": "LLM 학습, RAG 평가, vision batch는 모두 데이터 형태가 무너지면 모델 내부보다 먼저 실패한다.",
    "prerequisites": [
      "module-state"
    ],
    "learningGoals": [
      "Dataset, DataLoader, collate, split의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Dataset, DataLoader, collate, split의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "Dataset은 sample 계약, DataLoader는 batch 계약, collate는 묶는 규칙이다.",
      "flow": "raw examples → Dataset sample → collate batch → model input",
      "shape": "sample [T], batch [B,T], label [B,T]"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "Dataset은 index 하나를 sample 하나로 바꾸고 DataLoader는 여러 sample을 batch로 묶는다.",
        "code": "class TextDataset(Dataset):\n    def __getitem__(self, i):\n        chunk = ids[i:i + block_size + 1]\n        return chunk[:-1], chunk[1:]"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "Dataset은 샘플 하나를 어떻게 꺼낼지, DataLoader는 여러 샘플을 어떻게 섞고 묶을지를 담당한다.",
        "bullets": [
          "파일/행 데이터 → Dataset.__getitem__ → shuffle → collate_fn → batch tensor",
          "샘플 하나가 [T]라면 batch는 보통 [B,T]가 된다. 길이가 다르면 padding과 attention mask가 필요하다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "파일/행 데이터",
          "Dataset.__getitem__",
          "shuffle",
          "collate_fn",
          "batch tensor"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "def collate(batch):\n    ids = [torch.tensor(x[\"ids\"]) for x in batch]\n    padded = torch.nn.utils.rnn.pad_sequence(ids, batch_first=True, padding_value=0)\n    mask = padded.ne(0)\n    return {\"input_ids\": padded, \"attention_mask\": mask}"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "학습/검증 데이터가 섞이면 점수가 실제보다 좋아 보인다.",
          "길이가 다른 문장을 그냥 stack하면 오류가 난다.",
          "shuffle은 학습에는 보통 유리하지만 평가 재현성에는 주의가 필요하다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Next-token dataset",
      "steps": [
        "token id 목록을 만든다.",
        "block_size+1개를 잘라 x/y를 만든다.",
        "첫 batch shape를 출력한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "데이터 공급 계약과 모델 입력 shape를 연결한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "Dataset이 항상 모든 데이터를 메모리에 올려야 한다고 오해하기 쉽다."
    ],
    "checks": [
      "collate_fn은 언제 필요한가?",
      "train/valid leakage가 왜 문제인가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "token-embedding"
    ],
    "sources": [
      {
        "label": "PyTorch Datasets & DataLoaders",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/data_tutorial.html",
        "type": "official",
        "note": "Dataset, DataLoader, batch 공급 계약"
      },
      {
        "label": "PyTorch Learn the Basics",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        "type": "official",
        "note": "Tensor, autograd, model, DataLoader 학습 순서의 공식 기준"
      }
    ]
  },
  {
    "id": "token-embedding",
    "stage": "Transformer 구현",
    "title": "Tokenization, embedding, position",
    "oneLiner": "텍스트는 token id가 되고 embedding table lookup으로 벡터가 된다.",
    "whyNow": "Transformer block에 들어가기 전 입력 표현이 어떻게 만들어지는지 알아야 logits까지 추적할 수 있다.",
    "prerequisites": [
      "tensor-shape"
    ],
    "learningGoals": [
      "Tokenization, embedding, position의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Tokenization, embedding, position의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "텍스트는 token id가 되고, embedding table lookup으로 [B,T,C] 표현이 된다.",
      "flow": "text → token ids [B,T] → token embedding [B,T,C] + position [T,C]",
      "shape": "input_ids [B,T], embeddings [B,T,C]"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "Embedding은 one-hot matrix multiply와 같은 효과지만 table lookup으로 구현된다.",
        "code": "tok = nn.Embedding(vocab, C)(input_ids) pos = nn.Embedding(block, C)(positions) x = tok + pos"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "문자열은 모델이 바로 읽을 수 없으므로 tokenizer가 정수 id로 바꾸고, embedding table이 각 id를 벡터로 조회한다.",
        "bullets": [
          "text → tokens → ids [B,T] → token embedding [B,T,C] → position 정보 더하기",
          "입력 ids는 정수 [B,T], embedding 결과는 실수 [B,T,C]다. V는 어휘 크기, C는 hidden 크기다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "text",
          "tokens",
          "ids [B,T]",
          "token embedding [B,T,C]",
          "position 정보 더하기"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "ids = torch.tensor([[101, 2054, 2003, 102]])\ntok = torch.nn.Embedding(num_embeddings=30000, embedding_dim=768)\npos = torch.nn.Embedding(num_embeddings=512, embedding_dim=768)\nx = tok(ids) + pos(torch.arange(ids.size(1)))"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "token 하나가 항상 단어 하나라고 생각하면 안 된다.",
          "padding token까지 loss에 넣으면 학습 신호가 흐려진다.",
          "position 정보가 없으면 순서 구분이 약해진다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Embedding shape 출력",
      "steps": [
        "input_ids shape [2,8]을 만든다.",
        "Embedding 뒤 [2,8,C]를 확인한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "텍스트가 모델 내부 숫자로 변환되는 첫 단계를 이해한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "token 하나가 항상 단어 하나라고 오해하기 쉽다."
    ],
    "checks": [
      "Embedding table의 행과 열 의미는?",
      "position이 없으면 어떤 정보가 사라지는가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "attention-mask"
    ],
    "sources": [
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      },
      {
        "label": "PyTorch Build the Neural Network",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
        "type": "official",
        "note": "nn.Module과 forward 계약"
      }
    ]
  },
  {
    "id": "attention-mask",
    "stage": "Transformer 구현",
    "title": "Scaled dot-product attention과 causal mask",
    "oneLiner": "attention은 token 관계표를 만들고 미래 token을 mask한다.",
    "whyNow": "Transformer 구현의 핵심이며 KV cache, long context 비용, SDPA 최적화가 여기서 출발한다.",
    "prerequisites": [
      "token-embedding"
    ],
    "learningGoals": [
      "Scaled dot-product attention과 causal mask의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Scaled dot-product attention과 causal mask의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "Attention은 token 간 score 행렬을 만들고, causal mask로 미래 정답 누수를 막는다.",
      "flow": "Q,K,V → QKᵀ/√D → mask → softmax → weighted V",
      "shape": "q/k/v [B,H,T,D], score [B,H,T,T]"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "Query는 찾는 관점, Key는 주소, Value는 섞일 내용이다. causal mask는 다음 token 정답 누수를 막는다.",
        "code": "scores = q @ k.transpose(-2, -1) / math.sqrt(d)\nscores = scores.masked_fill(causal_mask == 0, -float('inf'))\nweights = scores.softmax(dim=-1)\nout = weights @ v",
        "widget": "attention"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "Attention은 각 token이 다른 token을 얼마나 참고할지 점수화한다. Causal mask는 미래 token을 보지 못하게 막는다.",
        "bullets": [
          "Q,K,V 생성 → QKᵀ 점수 → scale → mask 적용 → softmax → V 가중합",
          "Q,K,V는 [B,H,T,D], score는 [B,H,T,T], 출력은 다시 [B,H,T,D]다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "Q,K,V 생성",
          "QKᵀ 점수",
          "scale",
          "mask 적용",
          "softmax",
          "V 가중합"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "scores = q @ k.transpose(-2, -1) / (q.size(-1) ** 0.5)\nmask = torch.triu(torch.ones(T,T), diagonal=1).bool()\nscores = scores.masked_fill(mask, float(\"-inf\"))\nattn = scores.softmax(dim=-1)\nout = attn @ v"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "mask를 softmax 뒤에 적용하면 이미 확률이 새어 나간다.",
          "D로 나누지 않으면 score가 커져 softmax가 과하게 뾰족해질 수 있다.",
          "PyTorch SDPA는 입력 조건에 따라 더 빠른 구현을 자동 선택할 수 있다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Mask 전후 비교",
      "steps": [
        "T=4 toy q/k/v를 만든다.",
        "mask 전후 weights를 출력한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "attention shape와 causal mask 목적을 연결한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "mask를 softmax 뒤에 적용해도 같다고 오해하기 쉽다."
    ],
    "checks": [
      "QKᵀ 결과가 왜 [T,T]인가?",
      "미래 token을 보면 왜 학습 문제가 무너지는가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "multihead-block"
    ],
    "sources": [
      {
        "label": "PyTorch SDPA Tutorial",
        "url": "https://docs.pytorch.org/tutorials/intermediate/scaled_dot_product_attention_tutorial.html",
        "type": "official",
        "note": "scaled dot-product attention과 fused attention API"
      },
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      }
    ]
  },
  {
    "id": "multihead-block",
    "stage": "Transformer 구현",
    "title": "Multi-head attention과 Transformer block",
    "oneLiner": "block은 token mixing attention과 channel mixing MLP를 residual로 반복한다.",
    "whyNow": "Tiny decoder와 실제 LLM 구조를 읽기 위한 최소 조립 단위다.",
    "prerequisites": [
      "attention-mask"
    ],
    "learningGoals": [
      "Multi-head attention과 Transformer block의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Multi-head attention과 Transformer block의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "Block은 token mixing(attention)과 channel mixing(MLP)을 residual로 반복한다.",
      "flow": "norm → attention → residual → norm → MLP → residual",
      "shape": "입출력은 계속 [B,T,C]를 유지한다."
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "head마다 다른 관계 공간을 보고 concat 뒤 projection으로 다시 C 차원에 맞춘다.",
        "code": "class Block(nn.Module): def __init__(self): super().__init__() self.attn = SelfAttention() self.mlp = MLP() def forward(self, x): x = x + self.attn(norm(x)) return x + self.mlp(norm(x))"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "Multi-head attention은 여러 관점의 attention을 병렬로 계산하고, Transformer block은 attention과 MLP를 residual로 쌓는다.",
        "bullets": [
          "x → LayerNorm → MHA → residual → LayerNorm → MLP → residual",
          "block 입출력은 보통 [B,T,C]로 유지된다. 내부에서만 [B,H,T,D]로 잠시 나뉜다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "x",
          "LayerNorm",
          "MHA",
          "residual",
          "LayerNorm",
          "MLP",
          "residual"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "h = x + self.attn(self.ln1(x))\ny = h + self.mlp(self.ln2(h))\nreturn y  # shape 유지: [B,T,C]"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "head 수를 늘리면 항상 좋아지는 것은 아니다. C가 고정이면 head별 D는 작아진다.",
          "residual이 없으면 깊은 모델 학습이 불안정해진다.",
          "LayerNorm 위치는 pre-norm/post-norm 설계 차이를 만든다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Block skeleton 읽기",
      "steps": [
        "각 줄 옆에 shape 주석을 단다.",
        "attention과 MLP가 섞는 차원을 표시한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "block 내부를 layer 이름이 아니라 정보 흐름으로 읽는다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "MLP가 token 사이 정보를 섞는다고 오해하기 쉽다."
    ],
    "checks": [
      "attention과 MLP의 역할 차이는?",
      "block 입출력 shape를 유지하는 이유는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "tiny-decoder-lm"
    ],
    "sources": [
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      },
      {
        "label": "PyTorch Build the Neural Network",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
        "type": "official",
        "note": "nn.Module과 forward 계약"
      }
    ]
  },
  {
    "id": "tiny-decoder-lm",
    "stage": "Transformer 구현",
    "title": "Tiny decoder LM 학습 루프",
    "oneLiner": "token ids부터 loss까지 end-to-end 미니 언어모델을 연결한다.",
    "whyNow": "개별 부품을 실제 학습 루프로 묶어야 모델 내부 구현 감각이 생긴다.",
    "prerequisites": [
      "multihead-block",
      "dataset-loader"
    ],
    "learningGoals": [
      "Tiny decoder LM 학습 루프의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Tiny decoder LM 학습 루프의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "언어모델 학습은 x와 한 칸 밀린 y를 맞히는 next-token 루프다.",
      "flow": "ids → embedding → N blocks → lm_head → cross entropy",
      "shape": "logits [B,T,V], target [B,T]"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "decoder LM은 각 위치에서 다음 token을 맞히도록 학습한다. y는 x보다 한 칸 미래다.",
        "code": "for x, y in loader: logits = model(x) loss = F.cross_entropy(logits.view(-1, V), y.view(-1)) optimizer.zero_grad() loss.backward() optimizer.step()"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "Decoder LM은 이전 token들로 다음 token을 맞히도록 학습한다. 작은 모델로 전체 루프를 구현해 보면 큰 모델 구조도 읽기 쉬워진다.",
        "bullets": [
          "text ids → 입력/정답 한 칸 shift → decoder forward → logits → cross entropy → update",
          "input_ids [B,T], logits [B,T,V], targets [B,T]. loss 계산 전 [B*T,V]와 [B*T]로 펼친다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "text ids",
          "입력/정답 한 칸 shift",
          "decoder forward",
          "logits",
          "cross entropy",
          "update"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "x = batch[:, :-1]\ny = batch[:, 1:]\nlogits = model(x)\nloss = F.cross_entropy(logits.reshape(-1, V), y.reshape(-1))"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "정답을 shift하지 않으면 현재 token을 그대로 맞히는 문제가 된다.",
          "train loss만 보면 과적합을 놓친다.",
          "작은 데이터에서는 validation split을 반드시 남긴다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Toy overfit",
      "steps": [
        "작은 vocab과 짧은 문장을 만든다.",
        "loss가 내려가는지만 확인한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "언어모델 학습의 최소 닫힌 루프를 본다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "좋은 문장 생성이 되지 않으면 학습 루프가 틀렸다고 오해하기 쉽다."
    ],
    "checks": [
      "x/y가 한 칸 밀리는 이유는?",
      "logits와 target shape는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "generation-kv-cache"
    ],
    "sources": [
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      },
      {
        "label": "PyTorch Learn the Basics",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        "type": "official",
        "note": "Tensor, autograd, model, DataLoader 학습 순서의 공식 기준"
      }
    ]
  },
  {
    "id": "generation-kv-cache",
    "stage": "추론 최적화",
    "title": "Generation, sampling, KV cache",
    "oneLiner": "생성은 학습 forward와 달리 token을 순차적으로 뽑는 시스템 문제다.",
    "whyNow": "KV cache와 sampling은 실전 LLM latency, memory, 품질 체감을 좌우한다.",
    "prerequisites": [
      "attention-mask",
      "tiny-decoder-lm"
    ],
    "learningGoals": [
      "Generation, sampling, KV cache의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Generation, sampling, KV cache의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "생성은 prefill과 decode로 나뉘며, KV cache는 과거 K/V 재계산을 줄인다.",
      "flow": "prefill 입력 컨텍스트 → decode one token → append K/V cache → sample",
      "shape": "cache roughly [layers, B, H, T, D] for K and V"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "KV cache는 과거 token의 Key/Value를 저장해 새 token 생성 때 prefix 재계산을 줄인다.",
        "code": "past_kv = None\nfor _ in range(max_new_tokens):\n    logits, past_kv = model(input_ids[:, -1:], past_key_values=past_kv)\n    next_id = sample(logits[:, -1])\n    input_ids = torch.cat([input_ids, next_id], dim=1)",
        "widget": "kv-cache"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "생성은 한 token씩 반복한다. KV cache는 이전 token의 key/value를 저장해 매 단계 전체 문장을 다시 계산하는 비용을 줄인다.",
        "bullets": [
          "prefill → 첫 logits → sampling → 새 token → cache에 K/V 추가 → 다음 logits 반복",
          "cache는 layer마다 K,V를 보관한다. 길이가 늘수록 [B,H,T,D]에서 T가 커지며 메모리도 증가한다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "prefill",
          "첫 logits",
          "sampling",
          "새 token",
          "cache에 K/V 추가",
          "다음 logits 반복"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "with torch.no_grad():\n    out = model(input_ids, use_cache=True)\n    past = out.past_key_values\n    next_id = sample(out.logits[:, -1])\n    out = model(next_id[:, None], past_key_values=past, use_cache=True)"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "cache는 속도를 올리지만 메모리를 공짜로 만들지는 않는다.",
          "temperature/top_p는 학습이 아니라 디코딩 선택 방식이다.",
          "긴 입력의 prefill 비용과 생성 반복 비용을 구분한다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Cache 메모리 계산",
      "steps": [
        "layer/head/head_dim/context/dtype을 정한다.",
        "K와 V 두 벌의 bytes를 근사 계산한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "inference 최적화가 모델 구조뿐 아니라 시스템 비용 문제임을 안다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "KV cache를 학습에도 항상 켜야 한다고 오해하기 쉽다."
    ],
    "checks": [
      "prefill과 decode 차이는?",
      "cache가 메모리를 늘리는 이유는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "lora-qlora"
    ],
    "sources": [
      {
        "label": "Hugging Face KV cache strategies",
        "url": "https://huggingface.co/docs/transformers/kv_cache",
        "type": "official",
        "note": "generation 전용 KV cache와 Dynamic/Static/Quantized cache 구분"
      },
      {
        "label": "Hugging Face Text generation",
        "url": "https://huggingface.co/docs/transformers/main_classes/text_generation",
        "type": "official",
        "note": "sampling, temperature, top-k/top-p 설정 참고"
      }
    ]
  },
  {
    "id": "lora-qlora",
    "stage": "모델 적응",
    "title": "Fine-tuning, LoRA, QLoRA, adapter merge",
    "oneLiner": "LoRA는 큰 weight를 고정하고 작은 low-rank 변화량만 학습한다.",
    "whyNow": "현업에서는 모델 전체를 재학습하기보다 제한된 GPU/데이터로 목적에 맞게 적응시키는 일이 많다.",
    "prerequisites": [
      "autograd-loop",
      "module-state"
    ],
    "learningGoals": [
      "Fine-tuning, LoRA, QLoRA, adapter merge의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Fine-tuning, LoRA, QLoRA, adapter merge의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "LoRA는 base weight를 고정하고 low-rank adapter만 학습해 파라미터 예산을 줄인다.",
      "flow": "freeze base W → train A/B adapters → optionally merge for inference",
      "shape": "W [out,in], A [r,in], B [out,r]"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "rank r이 작으면 학습 파라미터와 optimizer state를 크게 줄일 수 있다.",
        "code": "# pseudo PyTorch: base weight는 고정하고 A/B adapter만 학습\nbase.weight.requires_grad_(False)\ny = x @ W.T + scale * (x @ A.T @ B.T)"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "LoRA는 큰 weight를 고정하고 작은 저랭크 adapter만 학습한다. QLoRA는 양자화된 base 위에서 adapter를 학습해 메모리를 줄인다.",
        "bullets": [
          "base weight 고정 → adapter A/B 삽입 → task 데이터로 adapter 학습 → 평가 → 필요 시 merge",
          "원래 W가 [out,in]이면 LoRA는 A [r,in], B [out,r]로 작은 ΔW를 만든다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "base weight 고정",
          "adapter A/B 삽입",
          "task 데이터로 adapter 학습",
          "평가",
          "필요 시 merge"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "base.weight.requires_grad_(False)\n# y = x @ W.T + scale * (x @ A.T @ B.T)\ntrainable = sum(p.numel() for p in model.parameters() if p.requires_grad)"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "LoRA는 새 지식을 무조건 완벽히 넣는 마법이 아니다. 데이터 품질과 평가가 더 중요하다.",
          "merge 후에는 adapter를 따로 끄고 켜기 어려울 수 있다.",
          "rank r을 키우면 표현력과 메모리가 함께 증가한다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "학습 파라미터 세기",
      "steps": [
        "Linear weight와 LoRA A/B 파라미터 수를 계산한다.",
        "rank 변화에 따른 비용을 비교한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "PEFT가 autograd freeze와 parameter budget 문제임을 이해한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "LoRA가 원본 weight를 직접 전부 수정한다고 오해하기 쉽다."
    ],
    "checks": [
      "rank r의 균형는?",
      "adapter merge는 언제 유용한가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "data-evaluation"
    ],
    "sources": [
      {
        "label": "Hugging Face PEFT LoRA",
        "url": "https://huggingface.co/docs/peft/conceptual_guides/lora",
        "type": "official",
        "note": "LoRA adapter, target module, merge 개념"
      },
      {
        "label": "PyTorch Autograd",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html",
        "type": "official",
        "note": "requires_grad, backward, no_grad 설명"
      }
    ]
  },
  {
    "id": "data-evaluation",
    "stage": "데이터와 평가",
    "title": "Data quality, RAG evaluation, regression set",
    "oneLiner": "모델/앱 개선은 좋은 평가셋 없이는 방향을 잃는다.",
    "whyNow": "튜닝과 RAG는 데이터 품질, 회귀 테스트, 실패 분류가 성능 개선의 핵심이다.",
    "prerequisites": [
      "dataset-loader",
      "app-bridge"
    ],
    "learningGoals": [
      "Data quality, RAG evaluation, regression set의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Data quality, RAG evaluation, regression set의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "평가셋은 개선 방향을 고정하는 기준선이다. 사례, 기대 동작, 실패 유형을 함께 둔다.",
      "flow": "collect cases → label expected behavior → run model/RAG → judge → regressions",
      "shape": "eval case는 input, expected, metadata, score로 구조화된다."
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "RAG 평가는 검색 적합도와 답변 정확도를 분리해 본다. fine-tuning 평가는 학습/검증 분리와 누수를 더 엄격히 본다.",
        "code": "case = {'question': q, 'expected': answer} actual = rag(case['question']) score = judge(expected=case['expected'], actual=actual)"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "모델 개선은 데이터와 평가 없이는 판단하기 어렵다. 고정된 regression set으로 바뀐 모델이 무엇을 잘하고 못하는지 기록한다.",
        "bullets": [
          "데이터 수집 → 라벨/기준 정리 → train/val/test 분리 → metric 계산 → error slice 분석",
          "평가 입력은 사례 목록, 출력은 점수표와 실패 유형 표다. 생성형 평가는 정답 문자열뿐 아니라 기준 문장도 필요하다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "데이터 수집",
          "라벨/기준 정리",
          "train/val/test 분리",
          "metric 계산",
          "error slice 분석"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "for ex in eval_set:\n    pred = run_model(ex[\"input\"])\n    score = metric(pred, ex[\"expected\"])\n    rows.append({\"id\": ex[\"id\"], \"score\": score, \"tag\": ex[\"tag\"]})"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "몇 개 예시만 보고 성능이 올랐다고 판단하면 위험하다.",
          "학습 데이터와 평가 데이터를 섞으면 회귀를 볼 수 없다.",
          "평균 점수만 보면 특정 유형의 실패가 가려진다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "10개 회귀셋 만들기",
      "steps": [
        "자주 실패한 질문 10개를 고른다.",
        "기대 답변과 실패 유형을 적는다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "모델 개선의 단위를 재현 가능한 사례로 만든다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "평균 점수 하나만 높으면 제품 품질도 항상 좋아진다고 오해하기 쉽다."
    ],
    "checks": [
      "RAG 검색 실패와 생성 실패를 분리하는가?",
      "검증 데이터 누수 예시는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "structured-agents-revisit"
    ],
    "sources": [
      {
        "label": "OpenAI Structured Outputs",
        "url": "https://platform.openai.com/docs/guides/structured-outputs",
        "type": "official",
        "note": "구조화 출력과 앱 레이어 평가 연결"
      },
      {
        "label": "LangGraph Documentation",
        "url": "https://langchain-ai.github.io/langgraph/",
        "type": "official",
        "note": "Agent/RAG orchestration을 모델 내부 학습과 분리해 보는 기준"
      }
    ]
  },
  {
    "id": "structured-agents-revisit",
    "stage": "앱 레이어 연결",
    "title": "Structured output과 tool agent 재점검",
    "oneLiner": "구조화 출력과 tool agent는 모델 내부가 아니라 신뢰 가능한 앱 계약을 만드는 레이어다.",
    "whyNow": "모델 내부 구현 지식을 앱 레이어 평가와 연결해야 실제 프로젝트 품질을 높일 수 있다.",
    "prerequisites": [
      "data-evaluation"
    ],
    "learningGoals": [
      "Structured output과 tool agent 재점검의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "Structured output과 tool agent 재점검의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "구조화 출력과 tool 호출은 모델 출력을 제품 코드가 다루는 계약으로 바꾼다.",
      "flow": "입력 컨텍스트 → constrained/structured output → tool call → validation → fallback",
      "shape": "JSON schema는 tensor shape가 아니라 API contract다."
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "structured output은 downstream 코드가 기대하는 필드를 안정적으로 받기 위한 장치다. 모델 parameter를 직접 바꾸지는 않는다.",
        "code": "schema = {'answer': 'string', 'citations': ['url'], 'confidence': 'number'} validate(model_output, schema)"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "구조화 출력은 모델 답을 정해진 schema에 맞추는 장치다. tool agent는 외부 작업을 실행하므로 실패 기록과 재시도 기준이 필요하다.",
        "bullets": [
          "요청 → schema 선택 → 모델 출력 → 파싱/검증 → 도구 실행 → 결과 기록",
          "모델 내부는 여전히 token logits를 만든다. 바깥에서는 JSON 객체나 tool call 기록으로 검증한다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "요청",
          "schema 선택",
          "모델 출력",
          "파싱/검증",
          "도구 실행",
          "결과 기록"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "schema = {\"answer\": str, \"citations\": list}\nobj = parse_and_validate(raw_text, schema)\nif not obj[\"citations\"]:\n    mark_failure(\"missing evidence\")"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "JSON 형식이 맞아도 내용이 맞는 것은 아니다.",
          "도구 실패를 모델 실패와 분리해서 기록해야 한다.",
          "재시도 횟수와 중단 조건을 정하지 않으면 비용이 커진다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Agent trace 평가 기준",
      "steps": [
        "tool 선택 성공/실패를 표시한다.",
        "인자 오류와 답변 오류를 분리한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "앱 계약과 모델 학습 문제를 분리한다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "JSON schema가 사실성을 보장한다고 오해하기 쉽다."
    ],
    "checks": [
      "structured output이 해결하지 못하는 문제는?",
      "tool 실패와 model 실패를 어떻게 나눌까?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "vision-transformer"
    ],
    "sources": [
      {
        "label": "OpenAI Structured Outputs",
        "url": "https://platform.openai.com/docs/guides/structured-outputs",
        "type": "official",
        "note": "구조화 출력과 앱 레이어 평가 연결"
      },
      {
        "label": "LangGraph Documentation",
        "url": "https://langchain-ai.github.io/langgraph/",
        "type": "official",
        "note": "Agent/RAG orchestration을 모델 내부 학습과 분리해 보는 기준"
      }
    ]
  },
  {
    "id": "vision-transformer",
    "stage": "비전 모델",
    "title": "CNN-to-ViT 전환과 patch embedding",
    "oneLiner": "ViT는 이미지를 patch token sequence로 바꿔 Transformer에 넣는다.",
    "whyNow": "LLM에서 배운 token/position/attention 감각을 vision 입력으로 확장한다.",
    "prerequisites": [
      "token-embedding",
      "attention-mask"
    ],
    "learningGoals": [
      "CNN-to-ViT 전환과 patch embedding의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "CNN-to-ViT 전환과 patch embedding의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "ViT는 이미지를 patch token sequence로 바꾸고 Transformer 흐름을 적용한다.",
      "flow": "image [B,C,H,W] → patches [B,N,P²C] → tokens [B,N,D] → Transformer",
      "shape": "224x224 image, patch 16이면 N=196 tokens"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "CNN은 local filter inductive bias가 강하고, ViT는 patch sequence와 attention으로 전역 관계를 학습한다.",
        "code": "patches = image.unfold(2, 16, 16).unfold(3, 16, 16)\npatches = patches.flatten(-3)\ntokens = patch_linear(patches)",
        "widget": "vit-patches"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "ViT는 이미지를 patch로 잘라 각 patch를 token처럼 다룬다. CNN의 지역 필터 대신 Transformer가 patch 사이 관계를 학습한다.",
        "bullets": [
          "image [B,C,H,W] → patch 분할 → patch embedding → position 추가 → Transformer → class head",
          "224×224 이미지를 16×16 patch로 자르면 14×14=196개 patch token이 생긴다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "image [B,C,H,W]",
          "patch 분할",
          "patch embedding",
          "position 추가",
          "Transformer",
          "class head"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "patches = image.unfold(2, 16, 16).unfold(3, 16, 16)\n# [B,C,14,14,16,16] -> [B,196,C*16*16]\ntokens = patch_proj(patches.flatten(2).transpose(1,2))"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "patch가 작을수록 token 수가 늘어 attention 비용이 커진다.",
          "이미지 크기가 바뀌면 position 처리도 함께 확인해야 한다.",
          "ViT도 충분한 데이터/증강 없이는 약할 수 있다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Patch 수 계산",
      "steps": [
        "224/16을 계산한다.",
        "patch token 개수와 attention score 크기를 구한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "이미지도 token sequence로 볼 수 있다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "ViT가 항상 작은 데이터에서도 CNN보다 낫다고 오해하기 쉽다."
    ],
    "checks": [
      "patch size가 작아지면 token 수는?",
      "CNN과 ViT의 bias 차이는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "multimodal-vlm"
    ],
    "sources": [
      {
        "label": "An Image is Worth 16x16 Words",
        "url": "https://arxiv.org/abs/2010.11929",
        "type": "paper",
        "note": "ViT patch embedding 원 논문"
      },
      {
        "label": "Stanford CS231n",
        "url": "https://cs231n.stanford.edu/",
        "type": "university",
        "note": "CNN, ViT 이전 vision 표현 학습의 대학 강의 기준"
      }
    ]
  },
  {
    "id": "multimodal-vlm",
    "stage": "멀티모달",
    "title": "CLIP/VLM 직관과 멀티모달 연결",
    "oneLiner": "이미지와 텍스트를 같은 의미 공간에 놓으면 검색과 grounding이 가능해진다.",
    "whyNow": "Vision을 배운 뒤에는 이미지 token과 언어 token이 어떻게 연결되는지 봐야 VLM을 읽을 수 있다.",
    "prerequisites": [
      "vision-transformer"
    ],
    "learningGoals": [
      "CLIP/VLM 직관과 멀티모달 연결의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "CLIP/VLM 직관과 멀티모달 연결의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "이미지와 텍스트 표현을 같은 공간에 맞추면 검색, 분류, grounding을 연결할 수 있다.",
      "flow": "image encoder → image embedding, text encoder → text embedding, contrastive alignment",
      "shape": "image vector [B,D], text vector [B,D], similarity [B,B]"
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "CLIP류 모델은 이미지와 텍스트 쌍을 가깝게, 다른 쌍을 멀게 하도록 학습해 zero-shot 분류/검색 감각을 만든다.",
        "code": "sim = image_emb @ text_emb.T loss = contrastive_loss(sim, labels=torch.arange(B))"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "VLM은 이미지 encoder와 언어 모델을 연결해 이미지 정보를 token 표현과 맞춘다. 핵심은 두 modality의 표현 공간을 어떻게 정렬하느냐다.",
        "bullets": [
          "image encoder → visual tokens → projection → language tokens와 결합 → decoder 생성",
          "이미지 patch 표현 [B,N,Cv]가 projection을 거쳐 언어 hidden [B,N,Clm]과 맞춰진다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "image encoder",
          "visual tokens",
          "projection",
          "language tokens와 결합",
          "decoder 생성"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "visual = image_encoder(pixel_values)      # [B,N,Cv]\nvisual = projector(visual)                # [B,N,Clm]\ninputs = concat_visual_and_text(visual, text_embeds)"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "이미지를 넣는다고 모든 시각 추론이 자동 해결되지는 않는다.",
          "해상도, crop, OCR 품질이 답변 품질에 크게 영향을 준다.",
          "시각 encoder와 언어 decoder의 토큰 길이 제한을 함께 본다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "Similarity matrix",
      "steps": [
        "이미지 3개와 문장 3개 embedding을 가정한다.",
        "정답 pair가 diagonal인 matrix를 그린다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "멀티모달은 modality별 encoder와 shared representation 문제다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "이미지 캡션 데이터만 있으면 grounding 문제가 모두 해결된다고 오해하기 쉽다."
    ],
    "checks": [
      "contrastive 학습의 positive/negative는?",
      "VLM에서 projection layer가 필요한 이유는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "on-device-optimization"
    ],
    "sources": [
      {
        "label": "Learning Transferable Visual Models From Natural Language Supervision",
        "url": "https://arxiv.org/abs/2103.00020",
        "type": "paper",
        "note": "CLIP식 image-text representation 연결"
      },
      {
        "label": "Stanford CS231n",
        "url": "https://cs231n.stanford.edu/",
        "type": "university",
        "note": "CNN, ViT 이전 vision 표현 학습의 대학 강의 기준"
      }
    ]
  },
  {
    "id": "on-device-optimization",
    "stage": "온디바이스 최적화",
    "title": "On-device 최적화: latency, memory, quantization, export",
    "oneLiner": "디바이스 배포는 정확도뿐 아니라 지연, 메모리, 전력의 균형 문제다.",
    "whyNow": "edge/on-device 환경에서는 서버 LLM과 다른 제약을 먼저 읽어야 한다.",
    "prerequisites": [
      "generation-kv-cache",
      "vision-transformer"
    ],
    "learningGoals": [
      "On-device 최적화: latency, memory, quantization, export의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "On-device 최적화: latency, memory, quantization, export의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "온디바이스 배포는 정확도, 지연시간, 메모리, 전력의 동시 제약을 맞추는 작업이다.",
      "flow": "train/eval model → export → quantize/optimize → runtime profile",
      "shape": "weights dtype, activation memory, batch/context가 비용을 결정한다."
    },
    "sections": [
      {
        "heading": "핵심 개념",
        "body": "quantization은 weight/activation 표현 정밀도를 낮춰 memory와 latency를 줄이지만 calibration과 정확도 손실 검증이 필요하다.",
        "code": "model.eval()\nwith torch.no_grad():\n    exported = torch.export.export(model, example_inputs)"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "On-device 배포는 정확도뿐 아니라 지연 시간, 메모리, 배터리, 모델 파일 크기의 균형 문제다.",
        "bullets": [
          "모델 선택 → quantization → export → runtime 실행 → latency/memory 측정 → 품질 회귀 확인",
          "가중치 dtype을 FP32에서 INT8/INT4로 줄이면 메모리는 줄지만 layer별 정확도 손실을 확인해야 한다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "모델 선택",
          "quantization",
          "export",
          "runtime 실행",
          "latency/memory 측정",
          "품질 회귀 확인"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "model.eval()\nexample = torch.randint(0, V, (1, 32))\n# export 전후에 같은 입력의 출력 차이와 latency를 함께 기록한다.\nwith torch.no_grad():\n    logits = model(example)"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "양자화는 항상 속도를 올리는 것이 아니라 hardware/runtime 의존적이다.",
          "평균 latency만 보면 첫 실행 비용이나 p95 지연을 놓친다.",
          "export 성공과 실제 디바이스 품질은 별도 검증이다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "배포 예산표",
      "steps": [
        "목표 latency와 memory를 정한다.",
        "fp16/int8 weight 크기를 비교한다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "on-device 최적화는 모델 구조와 런타임 제약의 공동 설계다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "quantization은 항상 정확도 손실 없이 빨라진다고 오해하기 쉽다."
    ],
    "checks": [
      "latency와 throughput 차이는?",
      "export 후 반드시 확인할 것은?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "capstone-map"
    ],
    "sources": [
      {
        "label": "ExecuTorch Documentation",
        "url": "https://pytorch.org/executorch/stable/index.html",
        "type": "official",
        "note": "PyTorch 계열 on-device 배포와 edge runtime 참고"
      },
      {
        "label": "ONNX Runtime Quantization",
        "url": "https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html",
        "type": "official",
        "note": "양자화와 추론 최적화 기준"
      }
    ]
  },
  {
    "id": "capstone-map",
    "stage": "미니 프로젝트",
    "title": "미니 프로젝트 지도: tiny transformer, RAG eval, on-device lab",
    "oneLiner": "학습한 장을 세 개의 작은 프로젝트로 묶어 포트폴리오형 이해를 만든다.",
    "whyNow": "개념을 읽는 것에서 끝내지 않고 구현/평가/배포 제약을 각각 체험해야 오래 남는다.",
    "prerequisites": [
      "tiny-decoder-lm",
      "data-evaluation",
      "on-device-optimization"
    ],
    "learningGoals": [
      "미니 프로젝트 지도: tiny transformer, RAG eval, on-device lab의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "미니 프로젝트 지도: tiny transformer, RAG eval, on-device lab의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "세 프로젝트는 구현, 평가, 배포 제약을 각각 검증 가능한 산출물로 만든다.",
      "flow": "implement → evaluate → optimize",
      "shape": "각 프로젝트는 입력/출력 계약과 성공 지표를 가진다."
    },
    "sections": [
      {
        "heading": "프로젝트 1: tiny transformer",
        "body": "작은 corpus로 loss가 내려가는 decoder를 만든다.",
        "code": "assert loss_after < loss_before"
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "최종 프로젝트는 작은 decoder, 평가셋, 경량 배포를 한 번에 엮어 전체 의사결정 흐름을 연습하는 장이다.",
        "bullets": [
          "목표 정의 → 데이터 준비 → tiny model 학습 → 평가 → 최적화 → 결과 노트",
          "학습에서는 [B,T]와 [B,T,V], 평가에서는 사례별 score table, 배포에서는 latency/memory 표를 남긴다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "목표 정의",
          "데이터 준비",
          "tiny model 학습",
          "평가",
          "최적화",
          "결과 노트"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "run = {\n  \"train_loss\": train_loss,\n  \"valid_loss\": valid_loss,\n  \"p95_latency_ms\": latency,\n  \"known_failures\": failures,\n}"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "프로젝트 범위를 크게 잡으면 완주보다 설정만 하다 끝난다.",
          "정량 지표 없이 느낌으로 개선을 판단하지 않는다.",
          "실패 사례를 지우지 말고 다음 개선 항목으로 남긴다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "2주 실행 계획",
      "steps": [
        "가장 약한 트랙 하나를 고른다.",
        "입력, 출력, 성공 기준을 한 줄씩 쓴다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "각 장의 개념이 검증 가능한 산출물로 바뀐다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "프로젝트는 무조건 크고 복잡해야 한다고 오해하기 쉽다."
    ],
    "checks": [
      "tiny transformer의 성공 지표는?",
      "RAG eval lab의 최소 데이터는?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [
      "checklist-sources"
    ],
    "sources": [
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      },
      {
        "label": "ExecuTorch Documentation",
        "url": "https://pytorch.org/executorch/stable/index.html",
        "type": "official",
        "note": "PyTorch 계열 on-device 배포와 edge runtime 참고"
      }
    ]
  },
  {
    "id": "checklist-sources",
    "stage": "마무리 점검",
    "title": "수업 전 체크리스트와 source map",
    "oneLiner": "부족한 선행 개념과 공식 출처를 마지막으로 점검한다.",
    "whyNow": "압축 과정 전에는 모르는 것을 줄이는 것보다 어디를 다시 볼지 아는 것이 중요하다.",
    "prerequisites": [
      "overview"
    ],
    "learningGoals": [
      "수업 전 체크리스트와 source map의 입력, 출력, 비용 기준을 초보자 언어로 설명한다.",
      "수업 전 체크리스트와 source map의 핵심 shape를 코드 출력과 연결한다.",
      "작은 PyTorch 또는 의사코드 예제로 같은 원리를 재현한다."
    ],
    "mentalModel": {
      "conceptNote": "마지막 점검은 약한 개념을 찾고 공식 출처로 되돌아가는 복습 루프다.",
      "flow": "check readiness → map weak topic → revisit source → run 짧은 실습",
      "shape": "체크리스트는 개념, 코드, 평가, 배포 네 축으로 나눈다."
    },
    "sections": [
      {
        "heading": "체크리스트",
        "body": "각 항목을 설명할 수 없으면 해당 장으로 돌아간다.",
        "bullets": [
          "[B,T,C]와 [B,H,T,D]",
          "loss/backward/step",
          "QKᵀ mask softmax",
          "KV cache prefill/decode",
          "LoRA freeze/adapter",
          "ViT patch token"
        ]
      },
      {
        "heading": "처음 보는 사람을 위한 용어 정리",
        "body": "좋은 교안은 배운 내용을 다시 찾을 수 있어야 한다. 공식 문서, 대학 강의, 구현 예제를 나눠 출처를 관리한다.",
        "bullets": [
          "개념 확인 → 공식 API 확인 → 강의 노트로 배경 이해 → 작은 코드로 재현 → 체크리스트 갱신",
          "학습 노트에는 장 id, 핵심 shape, 실행한 코드, 실패 원인, 참고 URL을 함께 둔다.",
          "모르는 기호가 나오면 이 장의 shape 문장을 먼저 다시 읽는다."
        ]
      },
      {
        "heading": "수업 판서처럼 따라가는 계산 흐름",
        "body": "아래 순서대로 손으로 화살표를 그리면 코드가 어떤 tensor를 만들고 넘기는지 빠르게 보인다.",
        "bullets": [
          "개념 확인",
          "공식 API 확인",
          "강의 노트로 배경 이해",
          "작은 코드로 재현",
          "체크리스트 갱신"
        ]
      },
      {
        "heading": "작은 코드로 확인하기",
        "body": "큰 기능을 바로 쓰기보다, 같은 원리를 작은 tensor와 짧은 코드로 먼저 확인한다. 실행 결과의 값보다 shape와 dtype을 먼저 출력한다.",
        "code": "note = {\n  \"chapter\": \"attention-mask\",\n  \"shape\": \"score [B,H,T,T]\",\n  \"check\": \"mask before softmax\",\n  \"source\": \"PyTorch SDPA docs\",\n}"
      },
      {
        "heading": "초보자가 자주 놓치는 지점",
        "body": "구현이 돌아가도 학습이 안 되거나 답이 이상할 때는 아래 항목부터 점검한다.",
        "bullets": [
          "블로그 글만 보고 API 세부 동작을 확정하지 않는다.",
          "출처를 읽어도 직접 작은 코드로 확인하지 않으면 오래 남지 않는다.",
          "복습 체크리스트는 완벽한 요약보다 다음 행동을 알려줘야 한다."
        ]
      },
      {
        "heading": "다음 장으로 넘어가기 전 확인",
        "body": "한 장을 끝낼 때는 정의를 외웠는지가 아니라, 입력과 출력, 비용, 실패 원인을 말할 수 있는지 확인한다.",
        "bullets": [
          "입력 tensor 또는 자료 구조를 말할 수 있다.",
          "출력의 shape와 의미를 말할 수 있다.",
          "가장 흔한 오류 하나와 확인 방법을 말할 수 있다."
        ]
      }
    ],
    "lab": {
      "title": "마지막 30분 복습",
      "steps": [
        "모르는 체크 3개를 고른다.",
        "공식 문서 링크를 하나씩 다시 연다.",
        "관련 코드 조각에서 shape 주석을 직접 붙인다.",
        "실패할 수 있는 입력 예시를 하나 만들고 원인을 적는다."
      ],
      "expectedInsight": "강의 전 자기 점검 루프를 갖는다. 수업 후에는 같은 주제를 작은 입력으로 직접 재현할 수 있어야 한다."
    },
    "misconceptions": [
      "모든 코드를 외워야 수업을 따라갈 수 있다고 오해하기 쉽다."
    ],
    "checks": [
      "가장 약한 장 세 개는?",
      "공식 출처를 어디서 다시 볼지 아는가?",
      "이 장의 입력 shape와 출력 shape를 말할 수 있는가?"
    ],
    "next": [],
    "sources": [
      {
        "label": "PyTorch Learn the Basics",
        "url": "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        "type": "official",
        "note": "Tensor, autograd, model, DataLoader 학습 순서의 공식 기준"
      },
      {
        "label": "Stanford CS224N",
        "url": "https://web.stanford.edu/class/cs224n/",
        "type": "university",
        "note": "NLP/Transformer 구현 중심 학습 흐름"
      },
      {
        "label": "Hugging Face KV cache strategies",
        "url": "https://huggingface.co/docs/transformers/kv_cache",
        "type": "official",
        "note": "generation 전용 KV cache와 Dynamic/Static/Quantized cache 구분"
      },
      {
        "label": "Hugging Face PEFT LoRA",
        "url": "https://huggingface.co/docs/peft/conceptual_guides/lora",
        "type": "official",
        "note": "LoRA adapter, target module, merge 개념"
      },
      {
        "label": "An Image is Worth 16x16 Words",
        "url": "https://arxiv.org/abs/2010.11929",
        "type": "paper",
        "note": "ViT patch embedding 원 논문"
      },
      {
        "label": "ExecuTorch Documentation",
        "url": "https://pytorch.org/executorch/stable/index.html",
        "type": "official",
        "note": "PyTorch 계열 on-device 배포와 edge runtime 참고"
      }
    ]
  }
];
