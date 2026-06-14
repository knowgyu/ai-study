window.AI_STUDY_CURRICULUM = [
  {
    "id": "overview",
    "stage": "오리엔테이션",
    "title": "전체 지도: Essential에서 Specialist로",
    "oneLiner": "앱을 조립하던 관점에서 모델 내부를 읽는 관점으로 이동한다.",
    "whyNow": "Agent/RAG를 이미 써봤다면 다음 병목은 모델이 입력을 어떻게 표현하고 추론을 어떻게 수행하는지 이해하는 것이다.",
    "prerequisites": [],
    "learningGoals": [
      "전체 지도: Essential에서 Specialist로의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
    ],
    "mentalModel": {
      "conceptNote": "먼저 학습 순서를 잡고, 각 장에서 입력·출력·비용 기준을 확인한다.",
      "flow": "Essential 앱 레이어 → Tensor/Module → Transformer → 추론/튜닝 → Vision/On-device",
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
        "heading": "앱 호출 아래의 계산 흐름",
        "body": "LLM 앱 호출 뒤에는 항상 tensor 계산과 sampling 정책이 있다.",
        "code": "response = agent.invoke(user_query) # 내부에는 tokenize → model forward → decode → tool/RAG orchestration 흐름이 숨어 있다."
      }
    ],
    "lab": {
      "title": "개인 로드맵 그리기",
      "steps": [
        "아는 주제와 낯선 주제를 표시한다.",
        "각 장의 최소 성공 문장을 한 줄로 쓴다."
      ],
      "expectedInsight": "전체 과정이 앱 개발, 모델 구현, 배포 최적화로 이어진다는 그림을 얻는다."
    },
    "misconceptions": [
      "Specialist 준비가 서비스 UI를 더 많이 만드는 과정이라고 혼동한다."
    ],
    "checks": [
      "PyTorch를 먼저 보는 이유를 말할 수 있는가?",
      "학습 최적화와 추론 최적화를 구분할 수 있는가?"
    ],
    "next": [
      "essential-bridge"
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
    "id": "essential-bridge",
    "stage": "오리엔테이션",
    "title": "Essential 복습: Agent·RAG·LangGraph와 모델 내부",
    "oneLiner": "Agent와 RAG는 모델을 둘러싼 제품/평가 레이어이고, Specialist는 그 아래 계산을 읽는다.",
    "whyNow": "이미 배운 tool calling, RAG, structured output을 모델 내부와 분리해야 어디를 튜닝할지 판단할 수 있다.",
    "prerequisites": [],
    "learningGoals": [
      "Essential 복습: Agent·RAG·LangGraph와 모델 내부의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
    ],
    "mentalModel": {
      "conceptNote": "Agent/RAG/LangGraph는 앱 오케스트레이션이고, Tensor/Module/Attention은 모델 계산이다.",
      "flow": "User → retriever/tool graph → model tokens → structured answer → evaluator",
      "shape": "문서는 chunk list, 모델 입력은 token ids [B,T], 출력은 logits [B,T,V]다."
    },
    "sections": [
      {
        "heading": "앱 레이어 복습",
        "body": "RAG는 지식을 검색해 입력 컨텍스트에 넣고, Agent는 tool 선택 흐름을 관리한다. 이 둘은 attention weight나 gradient를 직접 바꾸지 않는다.",
        "bullets": [
          "RAG 품질: 검색/컨텍스트/평가",
          "모델 품질: 데이터/파라미터/추론 설정"
        ]
      },
      {
        "heading": "실패 분류 실습",
        "body": "같은 질문에서 검색 실패와 모델 추론 실패를 분리해 기록한다.",
        "code": "trace = {'retrieved': docs, 'context_tokens': n, 'answer': answer} assert len(trace['retrieved']) > 0"
      }
    ],
    "lab": {
      "title": "RAG 실패 분류표",
      "steps": [
        "최근 만든 RAG 예제를 떠올린다.",
        "검색 실패, 컨텍스트 구성 실패, model decoding 실패로 나눈다."
      ],
      "expectedInsight": "앱 레이어 문제와 모델 내부 문제를 분리한다."
    },
    "misconceptions": [
      "Agent를 쓰면 모델 내부 이해가 필요 없어질 것이라고 혼동한다."
    ],
    "checks": [
      "RAG evaluation과 fine-tuning evaluation의 차이를 말할 수 있는가?",
      "LangGraph 노드와 nn.Module layer를 혼동하지 않는가?"
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
      "Tensor와 shape 읽기의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "x = torch.randn(B, T, C) qkv = linear(x).view(B, T, 3, H, D) q, k, v = qkv.unbind(dim=2) q = q.transpose(1, 2) # [B, H, T, D]"
      },
      {
        "heading": "Shape 흐름",
        "body": "matmul은 마지막 두 축을 행렬곱으로 보고 앞 축은 batch처럼 유지한다.",
        "bullets": [
          "q @ kᵀ → token-to-token score",
          "mask는 broadcast되므로 shape 확인이 필수"
        ]
      }
    ],
    "lab": {
      "title": "Head split 실습",
      "steps": [
        "torch.randn(2,4,12)를 만든다.",
        "head=3으로 [2,3,4,4]를 만든다.",
        "transpose 전후 stride를 출력한다."
      ],
      "expectedInsight": "shape 출력만으로 attention 코드 의도를 추론한다."
    },
    "misconceptions": [
      "reshape는 항상 안전하고 의미 보존된다고 혼동한다."
    ],
    "checks": [
      "[B,T,C]에서 T와 C의 역할을 구분하는가?",
      "mask shape가 틀리면 어떤 문제가 생기는가?"
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
      "Autograd와 학습 루프의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "for x, y in loader: logits = model(x) loss = F.cross_entropy(logits.view(-1, V), y.view(-1)) optimizer.zero_grad() loss.backward() optimizer.step()"
      },
      {
        "heading": "실무 연결",
        "body": "inference에서는 no_grad로 그래프 생성을 끄고, fine-tuning에서는 일부 weight만 학습한다.",
        "bullets": [
          "model.eval()은 gradient off가 아니다",
          "zero_grad 누락은 누적 버그를 만든다"
        ]
      }
    ],
    "lab": {
      "title": "Gradient 출력",
      "steps": [
        "Linear 회귀를 만든다.",
        "backward 전후 weight.grad를 출력한다.",
        "zero_grad를 빼고 차이를 본다."
      ],
      "expectedInsight": "학습 루프의 위생 규칙을 이해한다."
    },
    "misconceptions": [
      "loss.backward가 파라미터 값을 직접 바꾼다고 혼동한다."
    ],
    "checks": [
      "no_grad와 eval의 차이를 설명하는가?",
      "LoRA freeze를 autograd 용어로 설명하는가?"
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
      "nn.Module, state_dict, train/eval의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "train/eval 구분",
        "body": "Dropout, BatchNorm처럼 모드별 동작이 있는 layer 때문에 train/eval 전환이 필요하다.",
        "bullets": [
          "model(x) 호출은 hook을 통과한다",
          "state_dict는 class 정의 자체가 아니다"
        ]
      }
    ],
    "lab": {
      "title": "Parameter 등록 확인",
      "steps": [
        "TinyMLP를 만든다.",
        "named_parameters를 출력한다.",
        "Python list와 ModuleList 차이를 비교한다."
      ],
      "expectedInsight": "파라미터 누락 버그를 피한다."
    },
    "misconceptions": [
      "forward 안에서 새 layer를 만들면 학습된다고 혼동한다."
    ],
    "checks": [
      "state_dict만으로 모델 구조가 복원되는가?",
      "train/eval이 필요한 layer 예시는?"
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
      "Dataset, DataLoader, collate, split의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "class TextDataset(Dataset): def __getitem__(self, i): chunk = ids[i:i+block_size+1] return chunk[:-1], chunk[1:]"
      },
      {
        "heading": "collate와 데이터 분리",
        "body": "길이가 다른 sequence는 padding/collate가 필요하고, 평가는 leakage 없는 split이 중요하다.",
        "bullets": [
          "shuffle은 DataLoader 책임",
          "collate_fn은 batch 규칙"
        ]
      }
    ],
    "lab": {
      "title": "Next-token dataset",
      "steps": [
        "token id 목록을 만든다.",
        "block_size+1개를 잘라 x/y를 만든다.",
        "첫 batch shape를 출력한다."
      ],
      "expectedInsight": "데이터 공급 계약과 모델 입력 shape를 연결한다."
    },
    "misconceptions": [
      "Dataset이 항상 모든 데이터를 메모리에 올려야 한다고 혼동한다."
    ],
    "checks": [
      "collate_fn은 언제 필요한가?",
      "train/valid leakage가 왜 문제인가?"
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
      "Tokenization, embedding, position의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "Position 정보",
        "body": "self-attention 자체는 순서를 모르므로 위치 정보를 더해야 같은 단어라도 자리 차이를 표현한다.",
        "bullets": [
          "absolute position",
          "rotary/relative position은 이후 확장 주제"
        ]
      }
    ],
    "lab": {
      "title": "Embedding shape 출력",
      "steps": [
        "input_ids shape [2,8]을 만든다.",
        "Embedding 뒤 [2,8,C]를 확인한다."
      ],
      "expectedInsight": "텍스트가 모델 내부 숫자로 변환되는 첫 단계를 이해한다."
    },
    "misconceptions": [
      "token 하나가 항상 단어 하나라고 혼동한다."
    ],
    "checks": [
      "Embedding table의 행과 열 의미는?",
      "position이 없으면 어떤 정보가 사라지는가?"
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
      "Scaled dot-product attention과 causal mask의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "scores = q @ k.transpose(-2, -1) / math.sqrt(d) scores = scores.masked_fill(causal_mask == 0, -float('inf')) weights = scores.softmax(dim=-1) out = weights @ v",
        "widget": "attention"
      },
      {
        "heading": "비용과 최적화 포인트",
        "body": "score matrix가 [T,T]라서 sequence length가 늘면 memory와 연산량이 빠르게 커진다.",
        "bullets": [
          "SDPA는 같은 수식을 더 효율적으로 실행",
          "mask는 softmax 전에 적용"
        ]
      }
    ],
    "lab": {
      "title": "Mask 전후 비교",
      "steps": [
        "T=4 toy q/k/v를 만든다.",
        "mask 전후 weights를 출력한다."
      ],
      "expectedInsight": "attention shape와 causal mask 목적을 연결한다."
    },
    "misconceptions": [
      "mask를 softmax 뒤에 적용해도 같다고 혼동한다."
    ],
    "checks": [
      "QKᵀ 결과가 왜 [T,T]인가?",
      "미래 token을 보면 왜 학습 문제가 무너지는가?"
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
      "Multi-head attention과 Transformer block의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "Residual과 LayerNorm",
        "body": "깊은 네트워크에서 정보와 gradient 흐름을 안정화한다.",
        "bullets": [
          "pre-norm은 현대 decoder에서 자주 쓰인다",
          "MLP는 token별 channel 변환"
        ]
      }
    ],
    "lab": {
      "title": "Block skeleton 읽기",
      "steps": [
        "각 줄 옆에 shape 주석을 단다.",
        "attention과 MLP가 섞는 차원을 표시한다."
      ],
      "expectedInsight": "block 내부를 layer 이름이 아니라 정보 흐름으로 읽는다."
    },
    "misconceptions": [
      "MLP가 token 사이 정보를 섞는다고 혼동한다."
    ],
    "checks": [
      "attention과 MLP의 역할 차이는?",
      "block 입출력 shape를 유지하는 이유는?"
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
    "whyNow": "개별 부품을 실제 학습 루프로 묶어야 Specialist 구현 감각이 생긴다.",
    "prerequisites": [
      "multihead-block",
      "dataset-loader"
    ],
    "learningGoals": [
      "Tiny decoder LM 학습 루프의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "Loss shape 처리",
        "body": "cross_entropy는 보통 [N,V]와 [N]을 기대하므로 [B,T,V]를 [B*T,V]로 펴서 넣는다.",
        "bullets": [
          "tiny 모델은 개념 확인용",
          "overfit toy data로 루프 검증 가능"
        ]
      }
    ],
    "lab": {
      "title": "Toy overfit",
      "steps": [
        "작은 vocab과 짧은 문장을 만든다.",
        "loss가 내려가는지만 확인한다."
      ],
      "expectedInsight": "언어모델 학습의 최소 닫힌 루프를 본다."
    },
    "misconceptions": [
      "좋은 문장 생성이 되지 않으면 학습 루프가 틀렸다고 혼동한다."
    ],
    "checks": [
      "x/y가 한 칸 밀리는 이유는?",
      "logits와 target shape는?"
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
      "Generation, sampling, KV cache의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "past_kv = None for _ in range(max_new_tokens): logits, past_kv = model(input_ids[:, -1:], past_key_values=past_kv) input_ids = torch.cat([input_ids, sample(logits)], dim=1)",
        "widget": "kv-cache"
      },
      {
        "heading": "Sampling 설정",
        "body": "temperature, top-k, top-p는 다양성과 안정성의 균형를 조절한다.",
        "bullets": [
          "prefill은 병렬성이 높다",
          "decode는 순차성이 강하다",
          "cache는 속도 대신 메모리를 쓴다"
        ]
      }
    ],
    "lab": {
      "title": "Cache 메모리 계산",
      "steps": [
        "layer/head/head_dim/context/dtype을 정한다.",
        "K와 V 두 벌의 bytes를 근사 계산한다."
      ],
      "expectedInsight": "inference 최적화가 모델 구조뿐 아니라 시스템 비용 문제임을 안다."
    },
    "misconceptions": [
      "KV cache를 학습에도 항상 켜야 한다고 혼동한다."
    ],
    "checks": [
      "prefill과 decode 차이는?",
      "cache가 메모리를 늘리는 이유는?"
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
      "Fine-tuning, LoRA, QLoRA, adapter merge의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "# pseudo PyTorch: W는 freeze, A/B adapter만 학습 base.weight.requires_grad_(False) y = x @ W.T + scale * (x @ A.T @ B.T)"
      },
      {
        "heading": "QLoRA와 adapter 운용",
        "body": "base model을 저정밀로 들고 adapter를 학습해 메모리를 더 줄이는 접근이다.",
        "bullets": [
          "target module 선택 중요",
          "merge는 배포 단순화에 유리",
          "rank가 너무 작으면 표현력이 부족"
        ]
      }
    ],
    "lab": {
      "title": "학습 파라미터 세기",
      "steps": [
        "Linear weight와 LoRA A/B 파라미터 수를 계산한다.",
        "rank 변화에 따른 비용을 비교한다."
      ],
      "expectedInsight": "PEFT가 autograd freeze와 parameter budget 문제임을 이해한다."
    },
    "misconceptions": [
      "LoRA가 원본 weight를 직접 전부 수정한다고 혼동한다."
    ],
    "checks": [
      "rank r의 균형는?",
      "adapter merge는 언제 유용한가?"
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
      "essential-bridge"
    ],
    "learningGoals": [
      "Data quality, RAG evaluation, regression set의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "회귀 평가셋",
        "body": "한 번 고친 실패 사례는 작은 고정 테스트셋에 넣어 다음 변경에서 다시 깨지는지 본다.",
        "bullets": [
          "정답 하나보다 평가 기준이 필요할 때가 많다",
          "데이터 출처와 라이선스를 기록한다"
        ]
      }
    ],
    "lab": {
      "title": "10개 회귀셋 만들기",
      "steps": [
        "자주 실패한 질문 10개를 고른다.",
        "기대 답변과 실패 유형을 적는다."
      ],
      "expectedInsight": "모델 개선의 단위를 재현 가능한 사례로 만든다."
    },
    "misconceptions": [
      "평균 점수 하나만 높으면 제품 품질도 항상 좋아진다고 혼동한다."
    ],
    "checks": [
      "RAG 검색 실패와 생성 실패를 분리하는가?",
      "검증 데이터 누수 예시는?"
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
    "whyNow": "Specialist 구현 지식을 앱 레이어 평가와 연결해야 실제 프로젝트 품질을 높일 수 있다.",
    "prerequisites": [
      "data-evaluation"
    ],
    "learningGoals": [
      "Structured output과 tool agent 재점검의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "평가 연결",
        "body": "Agent 성공률은 tool 선택, 입력 인자, 최종 답변을 나누어 평가하면 개선 지점이 보인다.",
        "bullets": [
          "retry/fallback 정책",
          "schema validation",
          "tool result grounding"
        ]
      }
    ],
    "lab": {
      "title": "Agent trace 평가 기준",
      "steps": [
        "tool 선택 성공/실패를 표시한다.",
        "인자 오류와 답변 오류를 분리한다."
      ],
      "expectedInsight": "앱 계약과 모델 학습 문제를 분리한다."
    },
    "misconceptions": [
      "JSON schema가 사실성을 보장한다고 혼동한다."
    ],
    "checks": [
      "structured output이 해결하지 못하는 문제는?",
      "tool 실패와 model 실패를 어떻게 나눌까?"
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
      "CNN-to-ViT 전환과 patch embedding의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "patches = image.unfold(2, 16, 16).unfold(3, 16, 16) tokens = patch_linear(patches.flatten(-3))",
        "widget": "vit-patches"
      },
      {
        "heading": "Patch embedding",
        "body": "각 patch를 flatten 후 linear projection하면 텍스트 token embedding과 비슷한 [B,N,D] 표현이 된다.",
        "bullets": [
          "class token",
          "position embedding",
          "data scale 중요"
        ]
      }
    ],
    "lab": {
      "title": "Patch 수 계산",
      "steps": [
        "224/16을 계산한다.",
        "patch token 개수와 attention score 크기를 구한다."
      ],
      "expectedInsight": "이미지도 token sequence로 볼 수 있다."
    },
    "misconceptions": [
      "ViT가 항상 작은 데이터에서도 CNN보다 낫다고 혼동한다."
    ],
    "checks": [
      "patch size가 작아지면 token 수는?",
      "CNN과 ViT의 bias 차이는?"
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
      "CLIP/VLM 직관과 멀티모달 연결의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "VLM 연결",
        "body": "현대 VLM은 vision encoder 출력 token을 language model 입력 공간에 맞춰 넣는 식의 bridge를 둔다.",
        "bullets": [
          "alignment dataset",
          "projection layer",
          "grounding/evaluation"
        ]
      }
    ],
    "lab": {
      "title": "Similarity matrix",
      "steps": [
        "이미지 3개와 문장 3개 embedding을 가정한다.",
        "정답 pair가 diagonal인 matrix를 그린다."
      ],
      "expectedInsight": "멀티모달은 modality별 encoder와 shared representation 문제다."
    },
    "misconceptions": [
      "이미지 캡션 데이터만 있으면 grounding 문제가 모두 해결된다고 혼동한다."
    ],
    "checks": [
      "contrastive 학습의 positive/negative는?",
      "VLM에서 projection layer가 필요한 이유는?"
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
    "whyNow": "삼성/edge 맥락에서는 서버 LLM과 다른 제약을 먼저 읽어야 한다.",
    "prerequisites": [
      "generation-kv-cache",
      "vision-transformer"
    ],
    "learningGoals": [
      "On-device 최적화: latency, memory, quantization, export의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "code": "model.eval() with torch.no_grad(): exported = torch.export.export(model, example_inputs)"
      },
      {
        "heading": "Export와 runtime",
        "body": "PyTorch 모델을 edge runtime이 이해하는 graph로 내보내고 operator 지원, shape 제약, backend 성능을 확인한다.",
        "bullets": [
          "latency budget",
          "peak memory",
          "fallback op 주의"
        ]
      }
    ],
    "lab": {
      "title": "배포 예산표",
      "steps": [
        "목표 latency와 memory를 정한다.",
        "fp16/int8 weight 크기를 비교한다."
      ],
      "expectedInsight": "on-device 최적화는 모델 구조와 런타임 제약의 공동 설계다."
    },
    "misconceptions": [
      "quantization은 항상 정확도 손실 없이 빨라진다고 혼동한다."
    ],
    "checks": [
      "latency와 throughput 차이는?",
      "export 후 반드시 확인할 것은?"
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
      "미니 프로젝트 지도: tiny transformer, RAG eval, on-device lab의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
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
        "heading": "프로젝트 2~3",
        "body": "RAG regression set과 on-device compression lab을 별도 트랙으로 둔다.",
        "bullets": [
          "RAG: 20개 회귀 질문",
          "On-device: quantization 전후 latency/memory 비교"
        ]
      }
    ],
    "lab": {
      "title": "2주 실행 계획",
      "steps": [
        "가장 약한 트랙 하나를 고른다.",
        "입력, 출력, 성공 기준을 한 줄씩 쓴다."
      ],
      "expectedInsight": "각 장의 개념이 검증 가능한 산출물로 바뀐다."
    },
    "misconceptions": [
      "프로젝트는 무조건 크고 복잡해야 한다고 혼동한다."
    ],
    "checks": [
      "tiny transformer의 성공 지표는?",
      "RAG eval lab의 최소 데이터는?"
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
      "수업 전 체크리스트와 source map의 핵심 개념을 shape, 코드 흐름, 비용 관점에서 설명한다.",
      "짧은 실습과 self-check로 입력·출력 계약과 흔한 실수를 확인한다."
    ],
    "mentalModel": {
      "conceptNote": "마지막 점검은 약한 개념을 찾고 공식 출처로 되돌아가는 복습 루프다.",
      "flow": "check readiness → map weak topic → revisit source → run mini lab",
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
        "heading": "Source map",
        "body": "아래 출처 목록은 renderer가 전체 챕터 sources를 모아 다시 보여준다.",
        "code": "for chapter in curriculum: print(chapter.id, chapter.sources)"
      }
    ],
    "lab": {
      "title": "마지막 30분 복습",
      "steps": [
        "모르는 체크 3개를 고른다.",
        "공식 문서 링크를 하나씩 다시 연다."
      ],
      "expectedInsight": "강의 전 자기 점검 루프를 갖는다."
    },
    "misconceptions": [
      "모든 코드를 외워야 수업을 따라갈 수 있다고 혼동한다."
    ],
    "checks": [
      "가장 약한 장 세 개는?",
      "공식 출처를 어디서 다시 볼지 아는가?"
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
