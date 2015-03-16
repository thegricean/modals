import sys, re, string, numpy

p_strongs = numpy.arange(0.1, 0.9, 0.1)
costs = range(3, 10, 1)

for p_s in p_strongs:
    p_meds = numpy.arange(0.1, 1-p_s, 0.1)
    for p_m in p_meds:
        p_w = 1 - p_s - p_m
        for cost in costs:
            filename = str(p_s) + "_" + str(p_m) + "_" + str(p_w) + "_" + str(cost) + ".church"
            wF = open("model_fits/" + filename, "w")
            wF.write("(define p-strong " + str(p_s) + ")\n" + "(define p-mod " + str(p_m) + ")\n" + "(define p-weak " + str(p_w) + ")\n" + "(define cost " + str(cost) + ")\n")           
            f = open(sys.argv[1], "r")
            for l in f:
                wF.write(l)
            f.close()
            #print str(p_s) + "," + str(p_v) + "," + str(p_a) + "," + str(alpha)
