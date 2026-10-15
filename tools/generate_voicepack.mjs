import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const key=process.env.SPEECH_KEY, region=process.env.SPEECH_REGION;
if(!key||!region||!/^[a-z0-9-]{2,40}$/i.test(region)){console.error('Set SPEECH_KEY and SPEECH_REGION');process.exit(1);}
const only=process.env.ONLY_LANG||'bn-BD';
const rows=JSON.parse(await fs.readFile(path.join(root,'voice_recording_manifest.json'),'utf8')).filter(x=>only==='all'||x.language===only);
const out=path.join(root,'audio');await fs.mkdir(out,{recursive:true});
const xml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
let ok=0,fail=0;
for(const row of rows){const name=row.audio_filename;if(!/^[a-zA-Z0-9_-]+\.mp3$/.test(name)){fail++;continue;}const target=path.join(out,name);
try{if((await fs.stat(target)).size>500)continue;}catch{}
const voice=row.language==='bn-BD'?(process.env.AZURE_VOICE_BN||'bn-BD-NabanitaNeural'):(process.env.AZURE_VOICE_EN||'en-US-JennyNeural');
const ssml='<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="'+xml(row.language)+'"><voice name="'+xml(voice)+'"><prosody rate="-5%">'+xml(row.verified_script_to_record)+'</prosody></voice></speak>';
try{const res=await fetch('https://'+region+'.tts.speech.microsoft.com/cognitiveservices/v1',{method:'POST',headers:{'Ocp-Apim-Subscription-Key':key,'Content-Type':'application/ssml+xml','X-Microsoft-OutputFormat':'audio-24khz-96kbitrate-mono-mp3','User-Agent':'Sonamoni-Learning-Studio'},body:ssml,signal:AbortSignal.timeout(25000)});if(!res.ok)throw new Error(String(res.status));const audio=Buffer.from(await res.arrayBuffer());if(audio.length<500)throw new Error('Empty audio');await fs.writeFile(target,audio);ok++;console.log(name)}catch(e){fail++;console.error(name,String(e))}}
console.log('Complete',ok,'created',fail,'failed. Review pronunciations before publishing.')