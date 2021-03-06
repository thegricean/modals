import sys, re, string

f = open(sys.argv[1], "r")

print "utterance,probability,type"

for l in f:
    l = l.strip()
    toks = l.split(")) ((")
    bare = toks[0]
    must = toks[1]
    might = toks[2]
    probrains = map(float, bare.split(") (")[0].replace("(((", "").split())
    bareprobs = map(float, bare.split(") (")[1].replace("(", "").split())
    mustprobs = map(float, must.split(") (")[1].replace(")))", "").split())
    mightprobs = map(float, might.split(") (")[1].replace(")))", "").split())
    baresum = 0
    mustsum = 0
    mightsum = 0
    for i in range(len(probrains)):
        baresum = baresum + (probrains[i] * bareprobs[i])
        mustsum = mustsum + (probrains[i] * mustprobs[i])
        mightsum = mightsum + (probrains[i] * mightprobs[i])
    print "bare" + "," + str(baresum) + "," + "speaker_belief"
    print "must" + "," + str(mustsum) + "," + "speaker_belief"
    print "might" + "," + str(mightsum) + "," + "speaker_belief"
    
