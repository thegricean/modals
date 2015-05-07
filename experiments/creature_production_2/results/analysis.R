library(ggplot2)

setwd("~/Documents/git/cocolab/modals/experiments/creature_production_2/Submiterator-master")

d = read.table("creature-production-trials.tsv",sep="\t",header=T)
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
d[!is.na(d$question4_response)&d$question4_response != "o"&(100*(d$question4_response/8))==d$question4_answer,]$q4_correct = 1
d$score = NA
d$score = (d$q1_correct+d$q2_correct+d$q3_correct+d$q4_correct)


w = aggregate(score~workerid,data=d,sum)
d$worker_score = NA
d$worker_score = w$score[match(d$workerid,w$workerid)]

d = d[!is.na(d$evidence_type),]

s = read.csv("../results/strength_scores.csv",header=T)
s$ID = paste(s$item,s$evidence_type,s$freq)
d$ID = paste(d$item,d$evidence_type,d$freq)
d$strength_score = s$response[match(d$ID,s$ID)]

d = subset(d, select = c(workerid,item,evidence_type,freq,response,worker_score,strength_score))

table(d$response,d$evidence_type)

d_trim = d[d$worker_score > 13,]

table(d_trim$response,d_trim$evidence_type)

d_trim$item <- factor(d_trim$item)
d_trim$evidence_type <- factor(d_trim$evidence_type)
d_trim$freq <- factor(d_trim$freq)

d_trim = na.omit(d_trim)

head(d_trim)

aggregate(strength_score~response,d_trim,mean)

# modal choice by evidence directness and categorical evidence type

t = as.data.frame(prop.table(table(d_trim$strength_score,d_trim$response),mar=1))
head(t)
colnames(t) = c("Directness","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","might"))
t$Directness = as.numeric(as.character(t$Directness))

ggplot(t, aes(x=Directness,y=Proportion,color=ModalChoice)) +
  geom_point() +
  #geom_line() +
  geom_smooth() 
  #ylim(0,1)
#+
 # facet_wrap(~EvidenceType,scales="free_y")
ggsave("../results/modal_choices_bydirectness.pdf",height=3)


# histogram of modal choice by item and evidence type

t = as.data.frame(prop.table(table(d_trim$evidence_type,d_trim$response),mar=1))
head(t)
colnames(t) = c("EvidenceType","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=EvidenceType,y=Proportion,fill=ModalChoice)) +
  geom_bar(stat="identity")
#ggsave("modal_dist.pdf")

ggplot(t, aes(x=EvidenceType, y=Proportion, color=ModalChoice, group=ModalChoice)) +
  geom_point() +
  geom_line()
#ggsave("modal_choices_points.pdf")

# histogram of modal choice by item and evidence strength

i = d_trim[d_trim$evidence_type=="indirect",]

t = as.data.frame(prop.table(table(i$freq,i$response),mar=1))
head(t)
colnames(t) = c("EvidenceStrength","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=EvidenceStrength,y=Proportion,fill=ModalChoice)) +
  geom_bar(stat="identity")
#ggsave("indirect_modal_dist.pdf")

ggplot(t, aes(x=EvidenceStrength, y=Proportion, color=ModalChoice, group=ModalChoice)) +
  geom_point() +
  geom_line()
#ggsave("indirect_modal_choices_points.pdf")
