# AI Essential 이후 AI Specialist 예상 범위

작성일: 2026-06-08

## 결론
현재 보관된 AI Essential 자료를 보면 Essential은 **LLM API/프레임워크를 활용해서 Agent, RAG, LangGraph, 멀티에이전트, 도구 호출, 구조화 출력, SLM 서빙을 조립하는 실무 애플리케이션 과정**에 가깝다.

공개된 삼성전자 뉴스룸 설명상 AI Specialist는 그 다음 단계로, **언어/비전 최신 AI 모델의 구조, On-device AI 최적화, AI 윤리, 실제 현업 과제**를 다루는 석사 수준 심화 과정이다. 따라서 Specialist는 "LangChain으로 가져다 쓰기"보다 **모델 내부를 이해하고 직접 구현/튜닝/최적화하는 과정**일 가능성이 높다.

## Essential에서 한 것으로 보이는 것
로컬 자료 기준:

- LangChain Agent
- Tool calling
- Structured output / Pydantic schema
- Multi-agent / Sub-agent
- Agentic RAG
- LangGraph 기본: 상태 그래프, 분기, 루프
- Manual RAG + Tool Agent 프로젝트
- SmartThings 홈 IoT 제어 에이전트
- Qwen3-VL GGUF + llama-server 기반 SLM/멀티모달 Agent 프로젝트
- Docling MCP → 문서 처리 → RAG

즉, 핵심은 **기존 모델을 API나 로컬 서빙으로 붙이고, 도구/검색/워크플로우를 구성해서 업무 문제를 푸는 능력**이다.

## Specialist에서 할 가능성이 높은 것
### 1. Transformer를 바닥부터 구현
"트랜스포머를 처음부터 만든다"는 얘기는 꽤 그럴듯하다. Specialist가 모델 구조를 다룬다면 아래를 직접 구현할 가능성이 높다.

- Tokenization / vocabulary
- Embedding
- Positional encoding 또는 RoPE
- Scaled dot-product attention
- Multi-head attention
- Feed-forward network
- LayerNorm / residual connection
- Encoder block / Decoder block
- Causal mask
- Training loop
- Loss, optimizer, scheduler
- 작은 corpus로 mini language model 학습
- Inference: greedy decoding, sampling, temperature, top-k/top-p

### 2. LLM 구조 심화
- Transformer 계열 구조
- Encoder-only: BERT류
- Decoder-only: GPT/Llama/Qwen류
- Encoder-decoder: T5류
- Attention 변형: MHA, MQA, GQA
- Context length와 KV cache
- Fine-tuning, instruction tuning 개념
- LoRA/QLoRA 같은 PEFT

### 3. Vision 모델 구조
공개 설명에 "언어, 비전 등"이 있으므로 비전 파트도 가능성이 높다.

- CNN 기본 구조
- Vision Transformer, patch embedding
- 이미지 분류/검출/세그멘테이션 개념
- CLIP류 vision-language model
- 멀티모달 모델이 이미지와 텍스트를 연결하는 방식

### 4. On-device AI 최적화
삼성전자 제품 경쟁력과 직접 연결되는 부분이라 중요할 가능성이 높다.

- 모델 경량화
- Quantization: FP32 → FP16/INT8/INT4
- Pruning
- Knowledge distillation
- ONNX / TensorRT / TFLite / ExecuTorch 류 변환 개념
- Latency, memory, throughput 측정
- NPU/GPU/CPU 배치 전략
- 모바일/가전 디바이스에서 LLM·Vision 모델을 돌릴 때의 제약

### 5. RAG/Agent의 심화 구현
Essential에서 프레임워크 사용을 했다면 Specialist에서는 더 내부로 들어갈 수 있다.

- Embedding 모델 선택/평가
- Chunking 전략 비교
- Vector search 원리: cosine, dot product, ANN
- Re-ranking
- Query rewriting / decomposition
- Evaluation: faithfulness, answer relevancy, retrieval precision/recall
- Agent 실패 모드: tool misuse, hallucination, loop, state corruption

### 6. AI 윤리와 안전성
공개 설명에 명시되어 있음.

- 개인정보/보안
- Bias/fairness
- Hallucination과 검증
- 저작권/라이선스
- 모델 안전성 평가
- 온디바이스/클라우드 처리 시 데이터 거버넌스

### 7. 현업 과제 수행
단순 시험보다 프로젝트 성격이 강할 가능성이 높다.

예상 과제 형태:
- 특정 제품/서비스 문제를 AI 문제로 정의
- 데이터 수집/전처리
- 모델 또는 RAG/Agent 설계
- 성능 지표 정의
- baseline 구현
- 개선 실험
- 지연시간/비용/정확도 측정
- 결과 발표 및 리뷰

## Essential vs Specialist 차이
| 구분 | AI Essential | AI Specialist |
|---|---|---|
| 관점 | AI 애플리케이션 조립 | AI 모델/시스템 내부 이해 |
| 도구 | LangChain, LangGraph, RAG, Agent | PyTorch, Transformer, 최적화, 평가 |
| 모델 사용 | API/로컬 모델 호출 | 구조 이해, 구현, 튜닝, 경량화 |
| 과제 | 업무 자동화/에이전트 구현 | 현업 문제에 맞는 모델/시스템 설계와 검증 |
| 난이도 | 실무 입문~중급 | 심화/석사 수준 |

## 미리 준비하면 좋은 순서
1. PyTorch 기본
2. 선형대수 핵심: 행렬곱, 벡터 내적, softmax
3. Neural network training loop 직접 구현
4. Attention 수식 이해
5. Transformer mini 구현
6. Hugging Face Transformers 내부 구조 읽기
7. LoRA/QLoRA fine-tuning 실습
8. Quantization/ONNX 변환 실습
9. RAG 평가와 retriever/re-ranker 실험
10. 현업형 미니 프로젝트 1개 완성

## 바로 해볼 만한 미니 프로젝트
- `tiny-transformer-from-scratch`: PyTorch로 character-level 또는 word-level Transformer LM 구현
- `rag-eval-lab`: Essential RAG 프로젝트에 평가 지표와 re-ranking 추가
- `on-device-compression-lab`: 작은 모델을 FP32/FP16/INT8로 바꿔 latency와 정확도 비교
- `vision-transformer-mini`: CIFAR-10이나 MNIST로 ViT 기본 구조 구현

## 출처/근거
- 로컬 `ai-study/AI Essential` 자료: LangChain Agent, Multi-agent, Structured output, Agentic RAG, LangGraph, SmartThings Agent, Task Planning Agent SLM 노트북
- Samsung Newsroom Korea, 2025-04-18: AI Specialist는 언어/비전 최신 AI 모델 구조, On-device AI 최적화, AI 윤리, 실제 현업 과제를 다루는 석사 수준 심화 과정이라고 설명
