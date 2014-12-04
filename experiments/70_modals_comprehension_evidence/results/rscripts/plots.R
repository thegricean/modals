library(ggplot2)
theme_set(theme_bw(18))
setwd("~/webprojects/70_modals_comprehension_evidence/results/")
source("rscripts/helpers.r")
load("data/r.RData")

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

# Bin by directness with threshold

#dthreshold <- median(t$Directness)
t$Modal <- factor(t$Modal, levels=c("bare", "must", "might", "probably"))
t$directnessBin <- cut(t$Directness, breaks=4)
t.byDirectness <- summarySE(t, measurevar=c("Proportion"), groupvars=c("Modal", "directnessBin"))
ggplot(t.byDirectness, aes(x=directnessBin, y=Proportion, fill=Modal)) +
  geom_bar(stat="identity", color="black", position=position_dodge()) +
  facet_grid(.~Modal)
  