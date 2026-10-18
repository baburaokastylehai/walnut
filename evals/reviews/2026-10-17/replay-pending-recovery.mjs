// Replays reviewer-selected operations against fictional local artifacts.
// This is not a Walnut engine, model benchmark, or real connector test.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const repoRoot=path.resolve(process.argv[2] || process.cwd());
const {validateLedger}=await import(pathToFileURL(path.join(repoRoot,'plugins/walnut/scripts/ledger.mjs')).href);
const output=path.resolve(process.argv[3] || new URL('./replayed-results',import.meta.url).pathname);
fs.mkdirSync(output,{recursive:true});
const copy=x=>structuredClone(x);
const target={provider:'confluence',cloudId:'fictional',pageId:'nightjar-demo'};
const event={eventId:'fake-mirror-recovery:7',batchId:'fake-mirror-recovery',recordId:'fake-flow-17',action:'mirror',summary:'The fictional booking flow now explains full-slot behavior.',before:'Calendar shows remaining capacity.',after:'Calendar shows remaining capacity and a full-slot state.',source:'fictional-flow.md — human-approved context',publishedAt:'2026-10-17T20:00:00Z'};
const initial={target,main:{revision:10,ledger:JSON.parse(fs.readFileSync(path.join(repoRoot,'evals/regression-data/nightjar/ledger-initial.json')))},child:{id:'fake-flow-17',revision:1,semantic:event.before},pushCheckpoint:{mainRevision:9},pending:[]};
function save(name,before,actions,after,response,invariants){const dir=path.join(output,name);fs.mkdirSync(dir,{recursive:true});for(const [file,data] of Object.entries({'before.json':before,'actions.json':actions,'after.json':after,'invariants.json':invariants}))fs.writeFileSync(path.join(dir,file),JSON.stringify(data,null,2)+'\n');fs.writeFileSync(path.join(dir,'response.md'),response+'\n');}
const partial=copy(initial);partial.child={id:'fake-flow-17',revision:2,semantic:event.after};
partial.pending=[{target:copy(target),childId:partial.child.id,verifiedChildRevision:2,semanticSnapshot:partial.child.semantic,event:{...event,sequence:7}}];
assert.deepEqual(partial.main,initial.main);assert.deepEqual(partial.pushCheckpoint,initial.pushCheckpoint);
save('run-one-partial',initial,[{operation:'fake child write then readback',result:copy(partial.child)},{operation:'persist verified pending evidence before main append',result:copy(partial.pending)},{operation:'fake append rejected',result:'concurrent edit twice; no accepted main write'}],partial,'The mirror is updated. Its ledger event is still pending because the main-page append failed.',{pendingDurablySaved:true,mainUnchanged:true,successfulCheckpointUnchanged:true});
const recovered=copy(partial);const actions=[{operation:'resolve target',result:target},{operation:'read pending evidence',result:copy(recovered.pending)},{operation:'read main ledger',result:copy(recovered.main)},{operation:'read child',result:copy(recovered.child)}];
assert.deepEqual(recovered.pending[0].target,recovered.target);assert.equal(recovered.pending[0].childId,recovered.child.id);assert.equal(recovered.child.revision,recovered.pending[0].verifiedChildRevision);assert.equal(recovered.child.semantic,recovered.pending[0].semanticSnapshot);assert.equal(recovered.main.ledger.entries.some(e=>e.eventId===event.eventId),false);
actions.push({operation:'fake revision guard',result:{expected:10,actual:10,allow:true}});
const published={...event,sequence:recovered.main.ledger.headSequence+1};recovered.main.ledger.entries.push(published);recovered.main.ledger.headSequence=published.sequence;recovered.main.revision++;
assert.deepEqual(validateLedger(recovered.main.ledger),[]);actions.push({operation:'fake append missing event',result:copy(published)},{operation:'fake readback',result:copy(recovered.main)});assert.deepEqual(recovered.main.ledger.entries.at(-1),published);
recovered.pending=[];actions.push({operation:'clear verified pending evidence',result:[]});
assert.equal(published.sequence,4);assert.equal(published.eventId,event.eventId);assert.deepEqual(recovered.child,partial.child);assert.equal(recovered.main.ledger.entries.length,partial.main.ledger.entries.length+1);
save('run-two-recover-unchanged',partial,actions,recovered,'Recovered the flow mirror’s missing ledger event. The mirror was already current.',{eventCountAdded:1,sequenceAllocatedFromCurrentHead:4,stableIdentityPreserved:true,pendingClearedOnlyAfterReadback:true,childRewrites:0,ledgerValid:true});
const replayBefore=copy(recovered);replayBefore.pending=copy(partial.pending);const replay=copy(replayBefore);const existing=replay.main.ledger.entries.find(e=>e.eventId===event.eventId);
for(const key of Object.keys(event))assert.deepEqual(existing[key],event[key]);assert.deepEqual(replay.pending[0].target,replay.target);assert.equal(replay.child.id,replay.pending[0].childId);assert.equal(replay.child.semantic,replay.pending[0].semanticSnapshot);
const replayActions=[{operation:'resolve target',result:target},{operation:'read main ledger',result:copy(replay.main)},{operation:'verify existing stable event identity and payload',result:copy(existing)},{operation:'read affected child and verify semantic evidence',result:copy(replay.child)}];replay.pending=[];replayActions.push({operation:'clear verified pending evidence',result:[]});assert.deepEqual(replay.main,replayBefore.main);assert.deepEqual(replay.child,replayBefore.child);
save('run-two-already-present',replayBefore,replayActions,replay,'The pending flow event was already saved. I verified it and cleared the local recovery marker.',{sharedWrites:0,duplicateEvents:0,pendingClearedAfterEvidenceCheck:true,mainUnchanged:true,childUnchanged:true});
const staleBefore=copy(partial);staleBefore.child={id:'fake-flow-17',revision:3,semantic:'The fictional pilot now uses a separate allocation flow.'};const stale=copy(staleBefore);
assert.deepEqual(stale.pending[0].target,stale.target);assert.equal(stale.pending[0].childId,stale.child.id);assert.notEqual(stale.child.semantic,stale.pending[0].semanticSnapshot);assert.deepEqual(stale,staleBefore);
save('run-two-stale-child',staleBefore,[{operation:'resolve target',result:target},{operation:'read main ledger',result:copy(stale.main)},{operation:'read child',result:copy(stale.child)},{operation:'compare semantic evidence and stop recovery',result:{match:false,saved:stale.pending[0].semanticSnapshot,current:stale.child.semantic}}],stale,'The pending event describes the full-slot flow, but the mirror now describes a different allocation flow. I kept the recovery evidence; these versions need reconciliation before publishing its event.',{sharedWrites:0,pendingRetained:true,successfulCheckpointUnchanged:true,noNoChangeSuccessClaim:true});
console.log(JSON.stringify({reviewerSelectedCases:4,invariants:'pass',output}));
