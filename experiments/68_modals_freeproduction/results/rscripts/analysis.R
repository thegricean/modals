library(ggplot2)
theme_set(theme_bw(18))
setwd("~/webprojects/68_modals_freeproduction/results/")
source("rscripts/helpers.r")
load("data/r.RData")

## analysis of probability of p for SALT abstract
library(lmerTest)
baremust = subset(r, item_type %in% c("bare","must"))
nrow(baremust)
centered = cbind(baremust, myCenter(baremust[,c("item_type","item")]))

m = lmer(response ~ item_type + (1|item) + (1|workerid),data=centered)
summary(m)

m = lmer(response ~ item_type + (1|item) + (1|workerid),data=r)
summary(m)


## analysis of evidence for SALT abstract
baremust = subset(r, item_type %in% c("bare","must") & !red_evidence_type_greg %in% c("meta","uncertain"))
nrow(baremust)
baremust = droplevels(baremust)
baremust$EvidenceSource = as.factor(ifelse(baremust$red_evidence_type_greg == "perceptual","direct","indirect"))
m = glmer(EvidenceSource ~ item_type + (1|item) + (1|workerid),data=baremust,family="binomial")
summary(m)
