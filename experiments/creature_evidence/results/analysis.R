library(ggplot2)

setwd("~/Documents/git/cocolab/modals/experiments/creature_evidence/Submiterator-master")

d = read.table("creature-evidence-trials.tsv",sep="\t",header=T)
head(d)

p <- ggplot(d,aes(x=evidence_type,y=response,fill=as.factor(freq))) +
  geom_bar(stat='identity',position=position_dodge()) +
  facet_grid(.~item)
