#!/usr/bin/env python

import sys
import csv

f = open("../modals_freeproduction.tsv")
lines = [l.rstrip().split("\t") for l in f.readlines()]
f.close()

headers = lines[0]
headers.append("evidence")
#print lines
for i,l in enumerate(lines[1:]):
	response = l[7].strip('[]').split(", u")
	print response
	l[7] = response[0]
	l.append(response[1])


outfile = open("../modals_results.tsv","w")

outfile.write("\t".join(headers))
outfile.write("\n")
outfile.write("\n".join(["\t".join(l) for l in lines[1:]]))	

outfile.close()