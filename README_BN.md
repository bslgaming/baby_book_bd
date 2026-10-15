# সোনামণির পাঠশালা — Adventure Edition

## চালু করার নিয়ম
`python -m http.server 8000` চালিয়ে `http://localhost:8000`-এ খুলুন। সার্ভারে HTTPS দিয়ে deploy করলে সমর্থিত ব্রাউজারে PWA install দেখা যেতে পারে। কেবল HTML ফাইল `file://` হিসেবে খুললে PWA এবং মাইক্রোফোন রেকর্ডিং পুরো কাজ করবে না।

## গুরুত্বপূর্ণ বাংলা অডিও সীমাবদ্ধতা
JavaScript SpeechSynthesis একটি ব্রাউজার/OS পরিষেবা। বাংলা `bn-BD` বা `bn-IN` উচ্চারণের ভাল ভয়েস নেই এমন ডিভাইসে সম্পূর্ণ শুদ্ধ বাংলা উচ্চারণের নিশ্চয়তা দেওয়া যায় না। ডিভাইসের default English TTS দিয়ে বাংলা বলানোর পরিবর্তে এই অ্যাপ সতর্কবার্তা দেখায়। “ভয়েস স্টুডিও” থেকে বাংলা voice পরীক্ষা করুন, আর অভিভাবক বা শিক্ষকের যাচাই করা MP3 অডিও আপলোড করুন। **এই ZIP-এ প্রফেশনাল মানুষের কণ্ঠের রেকর্ডেড অডিও অন্তর্ভুক্ত নেই।**

কার্ডে মা-বাবার কণ্ঠ মোড ব্যবহার করে প্রতিটি পাঠের ১৫ সেকেন্ড পর্যন্ত রেকর্ড করা যায়। Chrome/Edge-এ HTTPS বা localhost প্রয়োজন। অডিও IndexedDB-তে এই ডিভাইসে সংরক্ষিত হয়; কোনো সার্ভারে পাঠানো হয় না।

ভয়েস স্টুডিওতে এভাবে ফাইল দিন:
- `bn_s1.mp3` = অজগর
- `bn_s2.mp3` = আম
- `bn_b1.mp3` = কলা
- `num_1_bn.mp3` = এক (বাংলা)
- `num_1_en.mp3` = One (English)
- `en_A.mp3` = Apple
একবারে একাধিক ফাইল বেছে নেওয়া যায়। নিজস্ব পাঠ্যবস্তু ও অডিও যাচাই করা জরুরি।

## Play-to-learn
অজগরের কার্ড খুললে দৃশ্যমান জঙ্গলে সাপ সামনে-পেছনে এগোয়। ট্যাপে আলতো টোকা, সোয়াইপে মজার ছুড়ে দেওয়ার অ্যানিমেশন, রঙিন paw-print, pop sound, এবং তিন অ্যাকশনে তারকা। অন্য প্রাণী ও বস্তুর চরিত্রভিত্তিক মুভমেন্ট রয়েছে। `আমি বলি` বোতাম ব্রাউজার SpeechRecognition সমর্থন থাকলে শব্দের মিল অনুমান করে; **এটি উচ্চারণের শুদ্ধতা মাপার প্রযুক্তি নয়**।

## প্রাইভেসি ও অফলাইন
PWA service worker শুধু অ্যাপের shell cache করে। মাইক্রোফোন রেকর্ডিং শুধু স্থানীয় IndexedDB-তে থাকে। ভয়েস রেকর্ডিং অনুমতি ছাড়া চালু হয় না। সম্পূর্ণ অফলাইনে শুদ্ধ বাংলা ভয়েসের জন্য পূর্বে আমদানি করা অডিও প্রয়োজন।

## Neural Bangla voice pack — ডেভেলপার নোট

বাংলা কণ্ঠ ছাড়া সব ডিভাইসে মানসম্মত অডিও সরবরাহ করতে ZIP-এ `tools/generate_voicepack.mjs` আছে। এটি Azure Speech ব্যবহার করে প্রতিটি পাঠের জন্য MP3 তৈরি করে; **ডিফল্ট ZIP-এ তৈরি MP3 নেই**। ডেভেলপার নিজের Azure Speech resource ব্যবহার করে নিম্নোক্ত কমান্ড চালাতে পারেন (Node.js 18+):

```bash
export SPEECH_KEY="<your-key>"
export SPEECH_REGION="<your-resource-region>"
node tools/generate_voicepack.mjs
```

Windows PowerShell:
```powershell
$env:SPEECH_KEY="<your-key>"
$env:SPEECH_REGION="<your-resource-region>"
node .\tools\generate_voicepack.mjs
```

বাংলাদেশি neural voice ডিফল্ট `bn-BD-NabanitaNeural`। পুরুষ কণ্ঠ চাইলে `AZURE_VOICE_BN=bn-BD-PradeepNeural` ব্যবহার করুন। English অডিওও তৈরি করতে `ONLY_LANG=all` সেট করুন। এটি সার্ভার/ডেভেলপার কম্পিউটারে চালানোর স্ক্রিপ্ট; key কখনো HTML বা ব্রাউজার কোডে রাখবেন না। Azure-এর রিকোয়েস্ট চার্জ প্রযোজ্য হতে পারে। `voice_recording_script.csv` ও JSON-এ সব পাঠের অডিও স্ক্রিপ্ট আছে।

অডিও তৈরি হলে `audio/*.mp3` রেখেই ওয়েবসাইট deploy করুন। অ্যাপ অগ্রাধিকার অনুযায়ী (১) অভিভাবকের আপলোড/রেকর্ড, (২) প্যাকের MP3, (৩) সংশ্লিষ্ট ভাষার TTS চালাবে। Number ও sentence-এর বাংলা/English অডিও আলাদা, তাই একটি ভাষার অডিও ভুল মোডে চালু হয় না। একটি বাংলা বাক্যের accent/intonation বাস্তবে ঠিক আছে কি না তা বাংলা মাতৃভাষী শিক্ষক/ভয়েস আর্টিস্টকে শুনে যাচাই করতে হবে—স্বয়ংক্রিয় TTS দিয়ে শতভাগ নিশ্চিত হওয়া যায় না।

`আমি বলি` মোড ব্যবহার করলে ব্রাউজারের speech recognition পরিষেবা অডিও সার্ভারে পাঠাতে পারে; সেটি ব্রাউজার/সার্ভিসভেদে নির্ভরশীল। ব্যবহারকারীর সম্মতি ও প্রাইভেসি নীতিমালা নিশ্চিত করুন।


## Storybook Atelier — ১৬ অক্টোবর ২০২৬ ডিজাইন আপডেট

- Warm-paper, forest-green, terracotta এবং soft-gold রঙের একীভূত প্রিমিয়াম ডিজাইন।
- বাংলা, English, সংখ্যা, বাক্য ও ছড়ার কার্ডে শেয়ার্ড 2.5D SVG scene renderer।
- প্রাকৃতিক অনুভূতির slow breathing, glide, swimming, cloud drift, leaves swaying, shadow/shimmer animations।
- অজগরের জঙ্গলে layered body texture, realistic shading, subtle head look ও সোয়াইপে প্রতিক্রিয়া।
- Desktop ও Mobile-এ animation toggle, reduced motion এবং অডিও workflow আগের মতো আছে।

**সীমা:** এই সংস্করণে procedural 2.5D SVG illustration ব্যবহার করা হয়েছে; photorealistic 3D motion-capture animation নয়। যথার্থ শুদ্ধ বাংলা MP3 অডিও এখনো রেকর্ড বা generate করা হয়নি—যাচাই করা human voice pack প্রয়োজন।