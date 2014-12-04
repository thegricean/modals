library(ggplot2)
theme_set(theme_bw(18))
setwd("~/webprojects/71_modals_forced_production/results/")
source("rscripts/helpers.r")
load("data/r.RData")


# histograms of modal choice by evidence type
t = as.data.frame(prop.table(table(r$evidence_type,r$response),mar=1))
head(t)
t[t$Var1 == "evidence2",]
colnames(t) = c("EvidenceType","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=EvidenceType,y=Proportion,fill=ModalChoice)) +
  geom_bar(stat="identity")
ggsave("graphs/modal_dist.pdf")

ggplot(t, aes(x=EvidenceType, y=Proportion, color=ModalChoice, group=ModalChoice)) +
  geom_point() +
  geom_line()
ggsave("graphs/modal_choices_points.pdf")

# histograms of modal choice by evidence type and item
t = as.data.frame(prop.table(table(r$item,r$evidence_type,r$response),mar=c(1,2)))
head(t)
t[t$Var1 == "coffee" & t$Var2 =="evidence2",]
colnames(t) = c("Item","EvidenceType","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=EvidenceType,y=Proportion,fill=ModalChoice)) +
  geom_bar(stat="identity") +
  facet_wrap(~Item)
ggsave("graphs/modal_dist_byitem.pdf")

ggplot(t, aes(x=EvidenceType, y=Proportion, color=ModalChoice, group=ModalChoice)) +
  geom_point() +
  geom_line() +
  facet_wrap(~Item)
ggsave("graphs/modal_choices_points_byitem.pdf")


# modal choice by evidence directness
t = as.data.frame(prop.table(table(r$Directness,r$response),mar=1))
head(t)
t[t$Var1 == .651,]
colnames(t) = c("Directness","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))
t$Directness = as.numeric(as.character(t$Directness))

ggplot(t, aes(x=Directness,y=Proportion,color=ModalChoice)) +
  geom_point() +
  #geom_line()
  geom_smooth()
ggsave("graphs/modal_choices_bydirectness.pdf")


# modal choice by evidence directness and categorical evidence type
t = as.data.frame(prop.table(table(r$EvidenceTypeCategorical,r$Directness,r$response),mar=1))
head(t)
t[t$Var1 == .651,]
colnames(t) = c("EvidenceType","Directness","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))
t$Directness = as.numeric(as.character(t$Directness))

ggplot(t, aes(x=Directness,y=Proportion,color=ModalChoice)) +
  geom_point() +
  #geom_line() +
  geom_smooth() +
  facet_wrap(~EvidenceType,scales="free_y")
ggsave("graphs/modal_choices_bydirectness.pdf")


t = as.data.frame(prop.table(table(r$EvidenceTypeCategorical,r$response),mar=1))
head(t)
t[t$Var1 == "inferential",]
colnames(t) = c("Evidence","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))
t$EvidenceType = factor(x=as.character(t$Evidence),levels=c("perceptual","reportative","inferential","wishful"))

ggplot(t, aes(x=EvidenceType,y=Proportion,color=ModalChoice,group=ModalChoice)) +
  geom_point() +
  geom_line() 
  #geom_smooth() +
  #facet_wrap(~EvidenceType,scales="free_y")
ggsave("graphs/modal_choices_byevidencetype.pdf")


## plot just bare and must
baremust = r[r$response %in% c("bare","must") & r$EvidenceTypeCategorical != "wishful",]
baremust = droplevels(baremust)
nrow(baremust)

t = as.data.frame(prop.table(table(baremust$Directness,baremust$response),mar=1))
head(t)
t[t$Var1 == .651,]
colnames(t) = c("Directness","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))
t$Directness = as.numeric(as.character(t$Directness))

ggplot(t, aes(x=Directness,y=Proportion,color=ModalChoice)) +
  geom_point() +
  #geom_line()
  geom_smooth(method="lm")
ggsave("graphs/baremus_choices_bydirectness.pdf")



t = as.data.frame(prop.table(table(baremust$EvidenceTypeCategorical,baremust$response),mar=1))
head(t)
t[t$Var1 == "inferential",]
colnames(t) = c("Evidence","Modal","Proportion")
t$ModalChoice = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))
t$EvidenceType = factor(x=as.character(t$Evidence),levels=c("perceptual","reportative","inferential","wishful"))

ggplot(t, aes(x=EvidenceType,y=Proportion,color=ModalChoice,group=ModalChoice)) +
  geom_point() +
  geom_line() 
#geom_smooth() +
#facet_wrap(~EvidenceType,scales="free_y")
ggsave("graphs/baremust_modal_choices_byevidencetype.pdf")
