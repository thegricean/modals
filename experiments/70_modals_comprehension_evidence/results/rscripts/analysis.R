library(ggplot2)
theme_set(theme_bw(18))
#setwd("~/webprojects/70_modals_comprehension_evidence/results/")
setwd("~/cogsci/projects/stanford/projects/modals/modals/experiments/70_modals_comprehension_evidence/results/")
source("rscripts/helpers.r")
load("data/r.RData")

head(r)

baremust = r[r$item_type %in% c("bare","must"),]
baremust = droplevels(baremust)
nrow(baremust)
table(baremust$item_type)

centered = cbind(baremust, myCenter(baremust[,c("item_type","Directness")]))
contrasts(centered$item_type)
head(centered)

## analysis of p(rain) after bare vs "must"
m = lmer(response~citem_type + (1|workerid) + (1|item), data=centered)
summary(m)

# means
agr = aggregate(response~item_type,FUN=mean,data=r)
agr$SD = aggregate(response~item_type,FUN=sd,data=r)$response
agr

## analysis of evidence after bare vs "must"
m = lmer(Directness~citem_type + (1|workerid) + (1|item), data=centered)
summary(m)

agr = aggregate(Directness~item_type,FUN=mean,data=r)
agr$SD = aggregate(Directness~item_type,FUN=sd,data=r)$Directness
agr

# ggplot(r, aes(x=Directness,y=response,color=EvidenceTypeCategorical,group=EvidenceTypeCategorical)) +
#   geom_point() +
#   geom_smooth(method="lm") +
#   facet_wrap(~item_type)

m.1 = glmer(response~cDirectness*EvidenceTypeCategorical + (1|workerid) + (1|item), data=centered, family="binomial")
summary(m.1)

anova(m, m.1) # interaction not justified


