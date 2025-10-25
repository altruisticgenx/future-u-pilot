export const AI_MODELS = [
  {
    name: 'GPT-4 Turbo',
    type: 'LLM',
    parameters: '1.76T',
    context_window: 128000,
    use_cases: ['Text Generation', 'Q&A', 'Code', 'Analysis'],
    deployment_status: 'production',
    vendor: 'OpenAI'
  },
  {
    name: 'Claude 3.5 Sonnet',
    type: 'LLM',
    parameters: 'Unknown',
    context_window: 200000,
    use_cases: ['Text Generation', 'Analysis', 'Code', 'Research'],
    deployment_status: 'production',
    vendor: 'Anthropic'
  },
  {
    name: 'Gemini 1.5 Pro',
    type: 'Multimodal',
    parameters: 'Unknown',
    context_window: 1000000,
    use_cases: ['Text', 'Vision', 'Audio', 'Video'],
    deployment_status: 'production',
    vendor: 'Google'
  },
  {
    name: 'DALL-E 3',
    type: 'Image Generation',
    parameters: 'Unknown',
    context_window: 4000,
    use_cases: ['Image Generation', 'Creative Design'],
    deployment_status: 'production',
    vendor: 'OpenAI'
  },
  {
    name: 'Stable Diffusion XL',
    type: 'Image Generation',
    parameters: '3.5B',
    context_window: 77,
    use_cases: ['Image Generation', 'Style Transfer'],
    deployment_status: 'production',
    vendor: 'Stability AI'
  },
  {
    name: 'Whisper Large',
    type: 'Speech Recognition',
    parameters: '1.5B',
    context_window: 'N/A',
    use_cases: ['Transcription', 'Translation'],
    deployment_status: 'production',
    vendor: 'OpenAI'
  },
  {
    name: 'LLaMA 3 70B',
    type: 'LLM',
    parameters: '70B',
    context_window: 8192,
    use_cases: ['Text Generation', 'Q&A', 'Reasoning'],
    deployment_status: 'production',
    vendor: 'Meta'
  },
  {
    name: 'Mistral Large',
    type: 'LLM',
    parameters: '176B',
    context_window: 32768,
    use_cases: ['Text Generation', 'Code', 'Analysis'],
    deployment_status: 'production',
    vendor: 'Mistral AI'
  }
];

export const DATASETS = [
  { name: 'ImageNet', size: '1.4M images', task: 'Classification', license: 'Research' },
  { name: 'COCO', size: '330K images', task: 'Detection/Segmentation', license: 'CC BY 4.0' },
  { name: 'LAION-5B', size: '5.8B images', task: 'Image-Text Pairs', license: 'Public Domain' },
  { name: 'Common Crawl', size: '250B pages', task: 'Text Corpus', license: 'Public Domain' },
  { name: 'The Pile', size: '825GB', task: 'Language Modeling', license: 'Mixed' },
  { name: 'OpenWebText', size: '38GB', task: 'Language Modeling', license: 'Public Domain' },
  { name: 'LibriSpeech', size: '1000 hours', task: 'Speech Recognition', license: 'CC BY 4.0' },
  { name: 'MS MARCO', size: '8.8M passages', task: 'Question Answering', license: 'MIT' },
  { name: 'SQuAD 2.0', size: '150K questions', task: 'Reading Comprehension', license: 'CC BY-SA 4.0' },
  { name: 'GLUE', size: '9 tasks', task: 'Language Understanding', license: 'Mixed' }
];

export const TRAINING_METRICS = {
  current_epoch: 8,
  total_epochs: 20,
  train_loss: 0.234,
  val_loss: 0.289,
  train_accuracy: 0.934,
  val_accuracy: 0.912,
  learning_rate: 0.0001,
  batch_size: 32,
  gpu_utilization: '94%',
  eta: '2h 14m'
};

export const MODEL_BENCHMARKS = [
  { model: 'GPT-4', mmlu: 86.4, hellaswag: 95.3, truthfulqa: 59.0 },
  { model: 'Claude 3.5', mmlu: 88.7, hellaswag: 95.4, truthfulqa: 83.0 },
  { model: 'Gemini 1.5', mmlu: 90.0, hellaswag: 92.0, truthfulqa: 75.0 },
  { model: 'GPT-3.5', mmlu: 70.0, hellaswag: 85.5, truthfulqa: 47.0 },
  { model: 'LLaMA 3', mmlu: 82.0, hellaswag: 87.3, truthfulqa: 51.0 }
];
