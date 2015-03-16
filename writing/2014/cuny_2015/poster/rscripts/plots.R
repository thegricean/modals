library(ggplot2)
theme_set(theme_bw(18))
setwd("~/cogsci/projects/stanford/projects/modals/modals/writing/2014/cuny_2015/poster/")
source("rscripts/helpers.r")

d = read.table("data/combined.comprehension.experiments.txt",sep="\t",quote="",header=T)
nrow(d)
head(d)

baremust = d[d$item_type %in% c("bare","must","might"),]

un = unique(baremust[,c("Directness","item","evidence")])
un$Strength = cut(un$Directness,breaks=3,labels=c("weak","medium","strong"))
un$StrengthBin = cut(un$Directness,breaks=3)
un
nrow(un)

ggplot(un, aes(x=Directness, fill=Strength)) +
  geom_histogram() +
  scale_fill_manual(values=wes_palette("Moonrise3"),name="Evidence strength") +  
  xlab("Strength") +
  ylab("Number of cases") #+
#  theme(legend.position="top")
ggsave("pics/strength_histogram.pdf",width=6,height=3.2)


### plot beliefs about q
beliefs = read.csv("data/beliefs-best-params.csv")
beliefs
beliefs$item_type = beliefs$utterance
beliefs$response = beliefs$probability
beliefs$Experiment = as.factor(ifelse(beliefs$type == "speaker_belief","speaker","listener"))
beliefs$ResponseType = "model"
beliefs$utterance = NULL
beliefs$probability = NULL

agr = aggregate(response ~ item_type + Experiment, FUN=mean, data=baremust)
agr$CILow = aggregate(response ~ item_type + Experiment, FUN=ci.low, data=baremust)$response
agr$CIHigh = aggregate(response ~ item_type + Experiment, FUN=ci.high, data=baremust)$response
agr$YMin = agr$response - agr$CILow
agr$YMax = agr$response + agr$CIHigh
head(agr)
agr$ResponseType = "empirical"
agrr = droplevels(merge(agr,beliefs,all=T))
agrr$ResponseType = as.factor(as.character(agrr$ResponseType))
summary(agrr)
agrr[is.na(agrr$YMin),]$YMin = 0
agrr[is.na(agrr$YMax),]$YMax = 0
dodge = position_dodge(.9)
agrr$Utterance = factor(agrr$item_type,levels=c("bare","must","might"))

ggplot(agrr, aes(x=Utterance, y=response, fill=Experiment)) +
  geom_bar(stat="identity",color="black",position=dodge) +
  scale_fill_manual(values=wes_palette("Moonrise3"),name="Belief",breaks=levels(agrr$Experiment),label=c("listener (Exp. 3a)", "speaker (Exp. 3b)")) +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25,position=dodge) +
  facet_wrap(~ResponseType) +
  ylab("Probability of belief in q") +
  theme(legend.position="top")
ggsave("pics/mean_beliefs.pdf",width=6,height=3.5)


## evidence
evidence = read.csv("data/evidence-best-params.csv")
evidence
evidence$Utterance = evidence$utterance
evidence$Strength = evidence$evidence
evidence$Proportion = evidence$probability
evidence$utterance = NULL
evidence$evidence = NULL
evidence$probability = NULL
evidence$ResponseType = "model"

baremust$StrengthBinSize = cut(baremust$Directness,breaks=3)
baremust$Strength = cut(baremust$Directness,breaks=3,labels=c("weak","medium","strong"))

tfreq = as.data.frame(table(baremust$Strength,baremust$item_type))
t = as.data.frame(prop.table(table(baremust$Strength,baremust$item_type),mar=2))
head(t)
head(tfreq)
colnames(t) = c("StrengthBin","Modal","Proportion")
colnames(tfreq) = c("StrengthBin","Modal","Freq")
t$Freq = tfreq$Freq
t$ResponseType = "empirical"
dodge = position_dodge(.9) 

t$Utterance = factor(x=t$Modal,levels=c("bare","must","might"))
t$Strength = factor(x=t$StrengthBin,levels=rev(levels(t$StrengthBin)))
t = droplevels(t[t$Modal != "probably",])
merged = merge(t,evidence,all=T)

ggplot(merged, aes(x=Utterance,y=Proportion,fill=Strength)) +
  geom_bar(stat="identity",position=dodge,color="black") +
  scale_fill_manual(values=wes_palette("Royal1"),name="Evidence strength") + #Moonrise2, Darjeeling2, Moonrise3, Chevalier
  ylab("Probability of evidence strength") +
  facet_wrap(~ResponseType) +
  theme(legend.position="top")
ggsave("pics/evidence_darjeeling2.pdf",width=7,height=4)
ggsave("pics/evidence_moonrise2.pdf",width=7,height=4)
ggsave("pics/evidence_moonrise3.pdf",width=7,height=4)
ggsave("pics/evidence_chevalier.pdf",width=7,height=4)
ggsave("pics/evidence_royal1.pdf",width=7,height=4)


### load production data (no model predictions here)
prod = read.table("data/production.txt",sep="\t",header=T,quote="")
nrow(prod)
head(prod)
prod$Strength = cut(prod$Directness,breaks=3,labels=c("weak","medium","strong"))

# histogram of bare/must choices by 3-binned evidence strength
baremust = droplevels(subset(prod, response %in% c("bare","must","might")))
tfreq = as.data.frame(table(baremust$Strength,baremust$response))
t = as.data.frame(prop.table(table(baremust$Strength,baremust$response),mar=1))
head(t)
head(tfreq)
colnames(t) = c("StrengthBin","Modal","Proportion")
colnames(tfreq) = c("StrengthBin","Modal","Proportion")
t$Freq = tfreq$Proportion
t$Strength = factor(x=t$StrengthBin,levels=rev(levels(t$StrengthBin)))
t$Utterance = factor(x=t$Modal,levels=c("bare","must","might"))
t = t[order(t$Utterance),]

ggplot(t, aes(x=Strength,y=Proportion,fill=Utterance)) +
  geom_bar(stat="identity") +
  scale_fill_manual(values=wes_palette("Moonrise3"),name="Utterance") +  
  xlab("Strength") +
  ylab("Probability of utterance") 
ggsave("pics/production.pdf",width=4.4,height=3.2)  
  
