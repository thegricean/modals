import sys, re, string

f = open(sys.argv[1], "r")

print "utterance,evidence,probability"

for l in f:
    l = l.strip()
    toks = l.split(")) ((")
    bare = toks[0]
    must = toks[1]
    evidences = bare.split(") (")[0].replace("(((", "").split()[0:3]
    bareprobs = map(float, bare.split(") (")[1].replace("(", "").split()[0:3])
    mustprobs = map(float, must.split(") (")[1].replace(")))", "").split()[0:3])
    baresum = sum(bareprobs)
    mustsum = sum(mustprobs)
    bareprobs_normed = [x/baresum for x in bareprobs]
    mustprobs_normed = [x/mustsum for x in mustprobs]

    for i in range(len(evidences)):
        print "bare" + "," + evidences[i] + "," + str(bareprobs_normed[i])
    for i in range(len(evidences)):
        print "must" + "," + evidences[i] + "," + str(mustprobs_normed[i])
