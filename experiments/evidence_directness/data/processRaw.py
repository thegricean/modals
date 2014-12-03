# trims down raw data file to include only relevant information
# removes and replaces excess symbols, punctuations, etc

import sys, re, string

f = open(sys.argv[1], "r")

# define the fields to keep
relevant_fields = ["workerid", "Answer.gender", "Answer.age", "Answer.income", "Answer.nativeLanguage", "Answer.orders", "Answer.domains", "Answer.probs"]
relevant_indices = []
#field that needs to be specially processed
special_field = "Answer.evidences"
special_index = 0

firstline = 0

for l in f:
    l = l.strip()
    l = l.replace("[", "")
    l = l.replace("]", "")
    if firstline == 0:
        l = l.replace('"', "")
        toks = l.split("\t")
        for field in relevant_fields:
            relevant_indices.append(toks.index(field))
        special_index = toks.index(special_field)
        firstline = 1
        print "\t".join(relevant_fields) + "\t" + special_field
    else:
        toks = l.split("\t")
        fieldsToPrint = []
        for i in relevant_indices:
            fieldToPrint = toks[i].replace('"', "")
            fieldsToPrint.append(fieldToPrint)
        fieldToPrint = toks[special_index].replace('"",""', '"";""').replace(",", ";").replace('"";""', ",").replace('"', "")
        print "\t".join(fieldsToPrint) + "\t" + fieldToPrint



