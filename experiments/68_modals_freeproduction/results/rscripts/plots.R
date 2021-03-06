library(ggplot2)
theme_set(theme_bw(18))
setwd("~/cogsci/projects/stanford/projects/modals/modals/experiments/68_modals_freeproduction/results/")
#setwd("~/webprojects/68_modals_freeproduction/results/")
source("rscripts/helpers.r")
load("data/r.RData")

agr = aggregate(response ~ item_type,data=r,FUN=mean)
agr$CILow = aggregate(response ~ item_type,data=r, FUN=ci.low)$response
agr$CIHigh = aggregate(response ~ item_type,data=r,FUN=ci.high)$response
agr$YMin = agr$response - agr$CILow
agr$YMax = agr$response + agr$CIHigh

agr$Modal = factor(x=as.character(agr$item_type),levels=c("bare","know","must","probably","think","might"))
ggplot(agr, aes(x=Modal,y=response)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25)
ggsave("graphs/means.pdf")

agr = aggregate(response ~ item_type + item,data=r,FUN=mean)
agr$CILow = aggregate(response ~ item_type+ item,data=r, FUN=ci.low)$response
agr$CIHigh = aggregate(response ~ item_type+ item,data=r,FUN=ci.high)$response
agr$YMin = agr$response - agr$CILow
agr$YMax = agr$response + agr$CIHigh

agr$Modal = factor(x=as.character(agr$item_type),levels=c("bare","know","must","probably","think","might"))
ggplot(agr, aes(x=Modal,y=response)) +
  geom_point() +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~item) +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/means_byitem.pdf")

# histograms of evidence type
t = as.data.frame(prop.table(table(r$item_type,r$evidence_type),mar=1))
head(t)
colnames(t) = c("Modal","EvidenceType","Proportion")
t$Condition = factor(x=as.character(t$Modal),levels=c("bare","know","must","probably","think","might"))

ggplot(t, aes(x=Condition,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity")
ggsave("graphs/evidence_dist.pdf")

# histograms of evidence type by item
t = as.data.frame(prop.table(table(r$item,r$item_type,r$evidence_type),mar=c(1,2)))
head(t)
colnames(t) = c("Item","Modal","EvidenceType","Proportion")
t[t$Item == "coffee" & t$Modal == "must",]
t$Condition = factor(x=as.character(t$Modal),levels=c("bare","know","must","probably","think","might"))

ggplot(t, aes(x=Condition,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity") +
  facet_wrap(~Item) +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/evidence_dist_byitem.pdf")

# histograms of reduced evidence type
t = as.data.frame(prop.table(table(r$item_type,r$red_evidence_type),mar=1))
head(t)
colnames(t) = c("Modal","EvidenceType","Proportion")
t$Condition = factor(x=as.character(t$Modal),levels=c("bare","know","must","probably","think","might"))

ggplot(t, aes(x=Condition,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity")
ggsave("graphs/evidence_dist_simple.pdf")

# histograms of evidence type by item
t = as.data.frame(prop.table(table(r$item,r$item_type,r$red_evidence_type),mar=c(1,2)))
head(t)
colnames(t) = c("Item","Modal","EvidenceType","Proportion")
t[t$Item == "coffee" & t$Modal == "must",]
t$Condition = factor(x=as.character(t$Modal),levels=c("bare","know","must","probably","think","might"))

ggplot(t, aes(x=Condition,y=Proportion,fill=EvidenceType)) +
  geom_bar(stat="identity") +
  facet_wrap(~Item) +
  theme(axis.text.x=element_text(angle=45,vjust=1,hjust=1))
ggsave("graphs/evidence_dist_byitem_simple.pdf")
