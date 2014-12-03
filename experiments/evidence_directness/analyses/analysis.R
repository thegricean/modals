library(ggplot2)
library(reshape2)
library(plyr)
source("~/Dropbox/Work/Grad_school/Research/Utilities/summarySE.R")

d <- read.csv("../data/long.csv")
d$domain <- factor(d$domain)
d$evidence <- factor(d$evidence)
d.summary <- summarySE(d, measure="prob", groupvars=c("evidence", "domain"))
d.summary <- d.summary[with(d.summary, order(domain, -prob)), ]
write.csv(d, "../data/summary.csv")
