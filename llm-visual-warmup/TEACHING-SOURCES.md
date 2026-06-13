# Teaching Sources Ledger

This ledger records the preferred sources for curriculum claims in `window.AI_STUDY_CURRICULUM[*].sources`.

## Source object schema

Each chapter source should use this shape:

```js
{ label, url, type: 'official' | 'university' | 'paper' | 'supplemental', note }
```

Use official/upstream or university material for factual/tooling claims. Third-party articles are acceptable only as supplemental intuition aids.

## Core source pool

| Curriculum area | Type | Label | URL | Notes |
|---|---|---|---|---|
| PyTorch basics workflow | official | PyTorch Learn the Basics | https://docs.pytorch.org/tutorials/beginner/basics/intro.html | Tensors, data, model, autograd, optimization, save/load sequence. |
| Dataset/DataLoader | official | PyTorch Datasets & DataLoaders | https://docs.pytorch.org/tutorials/beginner/basics/data_tutorial.html | Dataset, DataLoader, sample/batch supply contract. |
| Attention implementation | official | PyTorch scaled_dot_product_attention | https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html | SDPA signature, mask argument, dropout behavior. |
| KV cache | official | Hugging Face Transformers cache strategies | https://huggingface.co/docs/transformers/en/kv_cache | Dynamic/static/quantized cache concepts for generation. |
| KV cache explanation | official | Hugging Face cache explanation | https://huggingface.co/docs/transformers/cache_explanation | Reusing stored key/value tensors; inference-only caution. |
| LoRA/PEFT | official | Hugging Face PEFT LoRA reference | https://huggingface.co/docs/peft/package_reference/lora | LoRA configuration and low-rank adapter concept. |
| LoRA concept | official | Hugging Face PEFT LoRA conceptual guide | https://huggingface.co/docs/peft/main/en/conceptual_guides/lora | LoRA intuition and memory-efficient fine-tuning framing. |
| NLP implementation pedagogy | university | Stanford CS224N | https://web.stanford.edu/class/cs224n/ | Deep learning for NLP, LLMs, assignments, PyTorch implementation. |
| Vision implementation pedagogy | university | Stanford CS231n | https://cs231n.stanford.edu/ | Computer vision deep learning, end-to-end implementation framing. |
| Vision notes | university | CS231n course notes | https://cs231n.github.io/ | Supplemental course notes for visual models and assignments. |
| On-device deployment | official | ExecuTorch documentation | https://docs.pytorch.org/executorch/stable/index.html | PyTorch edge/on-device inference positioning. |
| ONNX quantization | official | ONNX Runtime quantization | https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html | 8-bit linear quantization terms and optimization flow. |

## Chapter-to-source guidance

- `overview`, `essential-bridge`: combine PyTorch Learn the Basics, Stanford CS224N, and project-local Essential materials.
- `tensor-shape`, `autograd-loop`, `module-state`, `dataset-loader`: cite PyTorch Learn the Basics and the DataLoader tutorial where relevant.
- `token-embedding`, `attention-mask`, `multihead-block`, `tiny-decoder-lm`: cite Stanford CS224N and PyTorch SDPA for implementation framing.
- `generation-kv-cache`: cite both Hugging Face cache pages; avoid implying cache is a training optimization.
- `lora-qlora`: cite Hugging Face PEFT LoRA reference/concept docs.
- `data-evaluation`, `structured-agents-revisit`: cite Stanford CS224N for task/evaluation pedagogy and local Essential materials for Agent/RAG bridge claims.
- `vision-transformer`, `multimodal-vlm`: cite Stanford CS231n/course notes and any implementation-specific upstream source added by the content lane.
- `on-device-optimization`: cite ExecuTorch and ONNX Runtime quantization docs.
- `capstone-map`, `checklist-sources`: cite the source map itself plus the official/university references used by prerequisite chapters.

## Review notes

- Prefer concise paraphrase over copying source prose.
- Keep source labels stable enough for a rendered source map.
- If a chapter makes a current tooling claim, make the linked source official/upstream and re-check it during final integration.
