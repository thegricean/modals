library(ggplot2)
theme_set(theme_bw(18))
setwd("~/cogsci/projects/stanford/projects/modals/modals/experiments/72_modals_comprehension_evidence_room/results/")
source("rscripts/helpers.r")
load("data/r.RData")
summary(r)

agr = aggregate(response ~ item_type,data=r,FUN=mean)
agr$SD = aggregate(response ~ item_type,data=r,FUN=sd)$response
agr
agr$CILow = aggregate(response ~ item_type,data=r, FUN=ci.low)$response
agr$CIHigh = aggregate(response ~ item_type,data=r,FUN=ci.high)$response
agr$YMin = agr$response - agr$CILow
agr$YMax = agr$response + agr$CIHigh

agr$Modal = factor(x=as.character(agr$item_type),levels=c("bare","must","probably","might"))
ggplot(agr, aes(x=Modal,y=response)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25)
ggsave("graphs/means.pdf")

agr = aggregate(response ~ item_type + item,data=r,FUN=mean)
agr$CILow = aggregate(response ~ item_type+ item,data=r, FUN=ci.low)$response
agr$CIHigh = aggregate(response ~ item_type+ item,data=r,FUN=ci.high)$response
agr$YMin = agr$response - agr$CILow
agr$YMax = agr$response + agr$CIHigh

agr$Modal = factor(x=as.character(agr$item_type),levels=c("bare","must","probably","might"))
ggplot(agr, aes(x=Modal,y=response)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~item) +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/means_byitem.pdf")


# histograms of evidence type
t = as.data.frame(prop.table(table(r$item_type,r$evidence),mar=1))
head(t)
colnames(t) = c("Modal","EvidenceType","Proportion")
t$Condition = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=Condition,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity")
ggsave("graphs/evidence_dist.pdf")

# histograms of evidence type by item
t = as.data.frame(prop.table(table(r$item,r$item_type,r$evidence),mar=c(1,2)))
head(t)
colnames(t) = c("Item","Modal","EvidenceType","Proportion")
t[t$Item == "coffee" & t$Modal == "must",]
t$Condition = factor(x=as.character(t$Modal),levels=c("bare","must","probably","might"))

ggplot(t, aes(x=Condition,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity") +
  facet_wrap(~Item) +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/evidence_dist_byitem.pdf")


t = as.data.frame(prop.table(table(r$item,r$item_type,r$evidence),mar=c(1,2)))
head(t)
colnames(t) = c("Item","Modal","Evidence","Proportion")
t$Directness = directness[paste(t$Item,t$Evidence),]$prob
head(t)

ggplot(t, aes(x=Directness,y=Proportion)) +
  geom_point() +
  geom_smooth() +
  facet_wrap(~Modal)
ggsave("graphs/directness.pdf")

t = as.data.frame(prop.table(table(r$item,r$item_type,r$EvidenceDirectnessCategorical),mar=c(1,2)))
t
colnames(t) = c("Item","Modal","EvidenceDirectness","Proportion")
ggplot(t, aes(x=EvidenceDirectness,y=Proportion)) +
  geom_bar(stat="identity") +
  facet_grid(Item~Modal)
ggsave("graphs/directness_categorical.pdf")

agr = aggregate(Proportion~Modal+EvidenceDirectness,FUN=mean,data=t)
agr$CILow = aggregate(Proportion~Modal+EvidenceDirectness,FUN=ci.low,data=t)$Proportion
agr$CIHigh = aggregate(Proportion~Modal+EvidenceDirectness,FUN=ci.high,data=t)$Proportion
agr$YMin = agr$Proportion - agr$CILow
agr$YMax = agr$Proportion + agr$CIHigh

dodge = position_dodge(.9)

ggplot(agr, aes(x=EvidenceDirectness,y=Proportion)) +
  geom_bar(stat="identity") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),position=dodge,width=.25) +
  facet_wrap(~Modal)
ggsave("graphs/directness_categorical_means.pdf")
