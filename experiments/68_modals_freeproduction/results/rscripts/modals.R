library(ggplot2)
theme_set(theme_bw(18))
setwd("~/webprojects/68_modals_freeproduction/results/")

source("rscripts/helpers.r")

load("data/r.RData")
#r = read.table("data/modals_results.tsv",quote="", sep="\t", header=T)
r = read.table("data/modals_results.txt",quote="", sep="\t", header=T)
nrow(r)
names(r)
r$trial = r$slide_number_in_experiment - 2
r = r[,c("assignmentid","workerid", "rt", "sentence", "language","gender.1","age","gender","trial","enjoyment","asses","comments","Answer.time_in_minutes","response","evidence","item","item_type","evidence_subtype","evidence_type")]
head(r)
r$red_evidence_type = as.factor(ifelse(r$evidence_type == "inferential","inferential",ifelse(r$evidence_type == "perceptual","perceptual",ifelse(r$evidence_type == "reportative","reportative",ifelse(r$evidence_type %in% c("meta","neg","neg_perceptual","wishfulthinnking"),"meta","uncertain")))))
table(r$red_evidence_type)
table(r$evidence_type)

summary(r)
table(r$item,r$item_type)
save(r,file="data/r.RData")
##################

ggplot(aes(x=gender.1), data=r) +
  geom_histogram()

ggplot(aes(x=rt), data=r) +
  geom_histogram() +
  scale_x_continuous(limits=c(0,50000))

ggplot(aes(x=age), data=r) +
  geom_histogram()

ggplot(aes(x=age,fill=gender.1), data=r) +
  geom_histogram()

ggplot(aes(x=enjoyment), data=r) +
  geom_histogram()

ggplot(aes(x=asses), data=r) +
  geom_histogram()

ggplot(aes(x=Answer.time_in_minutes), data=r) +
  geom_histogram()

ggplot(aes(x=age,y=Answer.time_in_minutes,color=gender.1), data=unique(r[,c("assignmentid","age","Answer.time_in_minutes","gender.1")])) +
  geom_point() +
  geom_smooth()

unique(r$comments)

####################
