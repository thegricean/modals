library(ggplot2)

setwd("~/Documents/git/cocolab/modals/experiments/creature_analysis/")

e = read.csv("data/evidence.csv",header=T)
head(e)
p = read.csv("data/production.csv",header=T)
head(p)
c = read.csv("data/comprehension.csv",header=T)
head(c)

## Figure 1: histogram of evidence strength

e$ID = paste(e$item,e$evidence_type,e$freq)
e_agr = aggregate(response~ID,data=e,mean)
e_agr$Strength = cut(e_agr$response,breaks=3,labels=c("weak","medium","strong"))
e_agr$StrengthBin = cut(e_agr$response,breaks=3)
ggplot(e_agr, aes(x=response, fill=Strength)) +
  geom_histogram() +
  #scale_fill_manual(values=rev(designer.colors(n=3, col=c("#046C9A","#ABDDDE"))),name="Evidence\nstrength") +
  xlab("Probability of q (evidence strength)") +
  ylab("Number of cases") 
#ggsave("plots/strength_histogram.pdf",width=5.5,height=3.2)


## Figure 2: production bars

p$ID = paste(p$item,p$evidence_type,p$freq)
p$Directness = e_agr$response[match(p$ID,e_agr$ID)]
p$Strength = cut(p$Directness,breaks=3,labels=c("weak","medium","strong"))
tfreq = as.data.frame(table(p$Strength,p$response))
t = as.data.frame(prop.table(table(p$Strength,p$response),mar=1))
head(t)
head(tfreq)
colnames(t) = c("StrengthBin","Modal","Proportion")
colnames(tfreq) = c("StrengthBin","Modal","Proportion")
t$Freq = tfreq$Proportion
t$Strength = t$StrengthBin
t$Utterance = factor(x=t$Modal,levels=c("might","must","bare"))
t = t[order(t$Utterance),]
ggplot(t, aes(x=Strength,y=Proportion,fill=Utterance)) +
  geom_bar(stat="identity") +
  #scale_fill_manual(values=wes_palette("Darjeeling"),name="Utterance") +  
  xlab("Strength") +
  ylab("Probability of utterance") #+
  #theme(plot.margin=unit(c(0,-0.5,0,0),units="cm"))
#ggsave("plots/production.pdf",width=4.4,height=3.2)


## Figure 3: comprehension inferred evidence strength

c$ID = paste(c$item,c$evidence_type,c$freq)
c$Directness = e_agr$response[match(c$ID,e_agr$ID)]
c$Strength = cut(c$Directness,breaks=3,labels=c("weak","medium","strong"))
tfreq = as.data.frame(table(c$modal,c$Strength))
t = as.data.frame(prop.table(table(c$modal,c$Strength),mar=1))
head(t)
head(tfreq)
colnames(t) = c("Modal","StrengthBin","Proportion")
colnames(tfreq) = c("Modal","StrengthBin","Proportion")
t$Freq = tfreq$Proportion
#t$Strength = factor(x=t$StrengthBin,levels=rev(levels(t$StrengthBin)))
t$Strength = t$StrengthBin
#t$Utterance = factor(x=t$Modal,levels=c("bare","must","might"))
t$Utterance = factor(x=t$Modal,levels=c("might","must","bare"))
t = t[order(t$Utterance),]

ggplot(t, aes(x=Utterance,y=Proportion,fill=Strength)) +
  geom_bar(stat="identity",position=position_dodge(.9)) +
  #scale_fill_manual(values=wes_palette("Darjeeling"),name="Utterance") +  
  xlab("Strength") +
  ylab("Probability of utterance strength") #+
ggsave("plots/evidence.pdf",width=4.4,height=3.2)

## Figure 4: comprehension probability of belief in q

head(c)
agr = aggregate(rating~modal,data=c,mean)
head(agr)
agr$CILow = aggregate(rating ~ modal, FUN=ci.low, data=c)$rating
agr$CIHigh = aggregate(rating ~ modal, FUN=ci.high, data=c)$rating
agr$YMin = agr$rating - agr$CILow
agr$YMax = agr$rating + agr$CIHigh
agr$Utterance = factor(agr$modal,levels=c("might","must","bare"))

ggplot(agr, aes(x=Utterance, y=rating)) +
  geom_bar(stat="identity",position=dodge) +
  #  scale_fill_manual(values=designer.colors(n=3, col=c("#046C9A","#ABDDDE")),name="Belief",breaks=levels(agrr$Experiment),label=c("listener (Exp. 3a)", "speaker (Exp. 3b)")) +
  #scale_fill_manual(values=wes_palette("Moonrise2"),name="Belief",breaks=levels(agrr$Experiment),label=c("listener\n(Exp. 3a)", "speaker\n(Exp. 3b)")) +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25,position=dodge) +
  #facet_wrap(~ResponseType) +
  ylab("Probability of belief in q") +
  xlab("Utterance")
  #theme(legend.key.size = unit(1.2, "cm"))
  #3theme(legend.position="top",plot.margin=unit(c(-0.5,0,0,0),units="cm"))
ggsave("plots/mean_beliefs.pdf",width=5.5,height=3.5)
