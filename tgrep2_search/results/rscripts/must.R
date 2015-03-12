library(ggplot2)
theme_set(theme_bw(18))
setwd("~/cogsci/projects/stanford/projects/modals/modals/tgrep2_search/results/")
source("rscripts/helpers.r")

load("data/r.RData")

r = read.table(file="swbd.tab", header=T, sep="\t", quote="")
r = read.table(file="bncs.tab", header=T, sep="\t", quote="")
nrow(r)
head(r)
table(r$Modal)

sample(r[r$Modal == "haveto",]$Sentence, 20)
sample(r[r$Modal == "must",]$Sentence, 20)

