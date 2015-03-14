library(ggplot2)

setwd("~/Documents/git/cocolab/modals/experiments/creature_comprehension/Submiterator-master")

d = read.table("creature-comprehension-trials.tsv",sep="\t",header=T)
head(d)

d$q1_correct = NA
d[!is.na(d$question1_response),]$q1_correct = 0
d[!is.na(d$question1_response)&(100*(d$question1_response/8))==d$question1_answer,]$q1_correct = 1
d$q2_correct = NA
d[!is.na(d$question2_response),]$q2_correct = 0
d[!is.na(d$question2_response)&(100*(d$question2_response/8))==d$question2_answer,]$q2_correct = 1
d$q3_correct = NA
d[!is.na(d$question3_response),]$q3_correct = 0
d[!is.na(d$question3_response)&(100*(d$question3_response/8))==d$question3_answer,]$q3_correct = 1
d$q4_correct = NA
d[!is.na(d$question4_response),]$q4_correct = 0
d[!is.na(d$question4_response)&(100*(d$question4_response/8))==d$question4_answer,]$q4_correct = 1
d$score = NA
d$score = (d$q1_correct+d$q2_correct+d$q3_correct+d$q4_correct)

w = aggregate(score~workerid,data=d,sum)
d$worker_score = NA
d$worker_score = w$score[match(d$workerid,w$workerid)]

d = d[!is.na(d$modal),]

d$evidence_type = NA
d[d$response=="e1",]$evidence_type = paste(d[d$response=="e1",]$choice1)
d[d$response=="e2",]$evidence_type = paste(d[d$response=="e2",]$choice2)
d[d$response=="e3",]$evidence_type = paste(d[d$response=="e3",]$choice3)

s = read.csv("strength_scores.csv",header=T)
s$ID = paste(s$item,s$evidence_type,s$freq)
d$ID = paste(d$item,d$evidence_type,d$freq)
d$strength_score = s$response[match(s$ID,d$ID)]


d = subset(d, select = c(workerid,item,modal,freq,choice1,choice2,choice3,rating,evidence_type,worker_score,strength_score,ID))

table(d$evidence_type,d$modal)

d_trim = d[d$worker_score > 13,]

table(d_trim$evidence_type,d_trim$modal)

d_trim = na.omit(d_trim)

d_trim$item <- factor(d_trim$item)
d_trim$evidence_type <- factor(d_trim$evidence_type)
d_trim$freq <- factor(d_trim$freq)

aggregate(rating~modal,data=d_trim,mean)
aggregate(rating~modal*evidence_type,data=d_trim,mean)

aggregate(rating~evidence_type,data=d_trim,mean)


# plot of rating by modal with evidence_type choice

d.s <- aggregate(rating~item*modal*freq*evidence_type,data=d_trim,mean)

p1 <- ggplot(d.s, aes(x=evidence_type, y=rating, fill=freq)) +
  geom_bar(stat="identity",position=position_dodge()) +
  #geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=evidence_type, width=0.1),position=position_dodge(width=0.9))+
  facet_grid(modal~item)
p1
#ggsave("rating-by-item.pdf")

p2 <- ggplot(d_trim, aes(x=modal, fill=freq)) +
  geom_histogram() +
  #geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=evidence_type, width=0.1),position=position_dodge(width=0.9))+
  facet_grid(freq~item)
p2
#ggsave("rating-by-item.pdf")

# plot modal choice by directness

t = as.data.frame(prop.table(table(d_trim$strength_score,d_trim$modal)))
head(t)
colnames(t) = c("Strength","Modal","Proportion")
head(t)

ggplot(t, aes(x=Strength,y=Proportion)) +
  geom_point() +
  geom_smooth(aes(group=1)) +
  facet_wrap(~Modal)
ggsave("directness.pdf")

# histogram of modal choice by item and evidence type

t = as.data.frame(prop.table(table(d_trim$modal,d_trim$evidence_type),mar=1))
head(t)
colnames(t) = c("Modal","EvidenceType","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=ModalChoice,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity")
#ggsave("../plots/modal_dist.pdf")

ggplot(t, aes(x=EvidenceType, y=Proportion, color=ModalChoice, group=ModalChoice)) +
  geom_point() +
  geom_line()
#ggsave("../plots/modal_choices_points.pdf")

# histogram of modal choice by item and evidence strength

i = d_trim[d_trim$evidence_type=="indirect",]

t = as.data.frame(prop.table(table(i$freq,i$modal),mar=1))
head(t)
colnames(t) = c("EvidenceStrength","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=EvidenceStrength,y=Proportion,fill=ModalChoice)) +
  geom_bar(stat="identity")
#ggsave("../plots/modal_dist.pdf")

ggplot(t, aes(x=EvidenceStrength, y=Proportion, color=ModalChoice, group=ModalChoice)) +
  geom_point() +
  geom_line()
#ggsave("../plots/modal_choices_points.pdf")