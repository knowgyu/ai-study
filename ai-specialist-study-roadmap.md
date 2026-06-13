# AI Specialist 대비 공부 로드맵

작성일: 2026-06-08

## 목표
AI Essential에서 배운 Agent/RAG/LLM 활용 역량을 바탕으로, AI Specialist에서 요구될 가능성이 높은 **수학, 딥러닝 기본기, Transformer 구현, LLM/Vision 구조, On-device 최적화, 현업 프로젝트 역량**을 준비한다.

## 전체 전략
Specialist 대비는 논문을 처음부터 많이 읽기보다, 아래 순서로 가는 것이 효율적이다.

1. 수학을 코드와 연결해서 복습한다.
2. PyTorch로 작은 신경망을 직접 학습시킨다.
3. Attention과 Transformer를 직접 구현한다.
4. 작은 언어모델/분류모델을 학습해 본다.
5. Hugging Face 모델 구조와 fine-tuning을 익힌다.
6. LoRA, quantization, ONNX 등 최적화 실습으로 넘어간다.
7. 마지막에는 현업형 미니 프로젝트로 정리한다.

---

## 1단계: 수학 기본기
기간: 1~2주

### 꼭 필요한 것만
#### 선형대수
- 벡터, 행렬, 텐서
- 행렬곱
- 내적, cosine similarity
- transpose
- broadcasting
- eigenvalue/SVD는 개념만

#### 미분/최적화
- 함수, 편미분
- chain rule
- gradient
- gradient descent
- learning rate
- local minimum, saddle point 개념

#### 확률/통계
- 확률분포
- 평균, 분산, 표준편차
- 조건부확률
- likelihood
- cross entropy
- softmax

### 공부 방식
수식만 보지 말고 항상 NumPy/PyTorch 코드로 확인한다.

예시 실습:
- 행렬곱으로 linear layer 직접 구현
- softmax 직접 구현
- cross entropy 직접 구현
- gradient descent로 y = wx + b 회귀 학습

---

## 2단계: 딥러닝 기본기
기간: 1~2주

### 핵심 개념
- Perceptron / MLP
- activation: ReLU, GELU, sigmoid
- loss function
- optimizer: SGD, Adam
- overfitting / regularization
- batch, epoch, mini-batch
- train/validation/test split
- normalization

### 실습
- MNIST MLP 분류
- 간단한 텍스트 분류
- PyTorch Dataset/DataLoader 사용
- training loop 직접 작성

목표는 `model.fit()` 같은 고수준 API가 아니라, 아래 흐름을 직접 익히는 것이다.

```python
for epoch in range(epochs):
    for x, y in dataloader:
        pred = model(x)
        loss = criterion(pred, y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

---

## 3단계: Attention / Transformer
기간: 2~3주

### 핵심 개념
- tokenization
- embedding
- positional encoding
- query/key/value
- scaled dot-product attention
- multi-head attention
- causal mask
- feed-forward network
- residual connection
- layer normalization
- encoder vs decoder
- autoregressive generation

### 직접 구현 순서
1. character tokenizer
2. embedding layer
3. self-attention 1개 head
4. multi-head attention
5. transformer block
6. tiny GPT-style language model
7. 짧은 텍스트로 학습
8. greedy decoding / sampling 구현

### 목표
논문 수식을 외우는 것이 아니라, `Q @ K.T / sqrt(d_k)`가 실제 코드에서 어떤 shape로 움직이는지 이해한다.

---

## 4단계: LLM 실무 심화
기간: 1~2주

### 핵심 주제
- decoder-only LLM 구조
- BERT/GPT/T5 차이
- pretraining vs fine-tuning vs instruction tuning
- tokenizer: BPE, SentencePiece 개념
- context window
- KV cache
- hallucination
- evaluation

### 실습
- Hugging Face `transformers`로 모델 로드
- tokenizer 출력 확인
- hidden state/attention mask 확인
- 작은 데이터셋으로 text classification fine-tuning
- LoRA fine-tuning 맛보기

---

## 5단계: Vision / Multimodal
기간: 1주

### 핵심 주제
- CNN 기본 구조
- ResNet 개념
- Vision Transformer
- patch embedding
- CLIP 개념
- vision-language model 구조

### 실습
- CIFAR-10 이미지 분류
- 간단한 CNN 구현
- 작은 ViT 구현 또는 Hugging Face ViT fine-tuning
- CLIP으로 image-text similarity 계산

---

## 6단계: On-device AI 최적화
기간: 1~2주

### 핵심 주제
- latency / throughput / memory
- FP32, FP16, INT8, INT4
- quantization
- pruning
- distillation
- ONNX 변환
- 모바일/NPU 제약

### 실습
- PyTorch 모델 추론 시간 측정
- dynamic quantization 적용
- ONNX export
- ONNX Runtime으로 추론 비교
- 정확도와 latency trade-off 기록

---

## 7단계: 현업형 프로젝트
기간: 2주

### 추천 프로젝트 1: Tiny Transformer from Scratch
- PyTorch로 GPT-style tiny language model 구현
- 작은 corpus 학습
- loss 감소 확인
- 샘플 문장 생성
- attention mask/shape 설명 가능해야 함

### 추천 프로젝트 2: Essential RAG 고도화
- 기존 Agentic RAG에 평가 지표 추가
- chunk size 비교
- embedding 모델 비교
- reranker 추가
- hallucination 케이스 분석

### 추천 프로젝트 3: On-device Optimization Lab
- 작은 text/image 모델 선택
- FP32 baseline 측정
- quantization 적용
- ONNX 변환
- latency/memory/accuracy 비교

---

## 매주 공부 루틴
주 5일 기준:

- 월: 수학/이론 1개 개념
- 화: 해당 개념 NumPy/PyTorch 구현
- 수: 모델 구조 실습
- 목: 미니 과제 또는 노트북 정리
- 금: 배운 내용을 1페이지로 요약 + 면접식 설명 연습

주말에는 누적 프로젝트를 리팩토링한다.

---

## 최우선 체크리스트
AI Specialist 전에 아래 질문에 답할 수 있으면 좋다.

- Attention에서 Q, K, V는 무엇이고 shape는 어떻게 되는가?
- causal mask는 왜 필요한가?
- Transformer block 안에는 무엇이 들어가는가?
- GPT와 BERT의 구조적 차이는 무엇인가?
- fine-tuning과 LoRA는 무엇이 다른가?
- quantization을 하면 왜 빨라지고 무엇을 잃는가?
- RAG에서 chunk size를 바꾸면 어떤 trade-off가 생기는가?
- On-device AI에서 가장 큰 병목은 무엇인가?
- 현업 문제를 AI 문제로 바꿀 때 metric은 어떻게 잡는가?

## 추천 시작점
바로 시작한다면 첫 프로젝트는 **tiny-transformer-from-scratch**가 가장 좋다. 수학, PyTorch, attention, training loop, LLM 구조가 한 번에 연결된다.
