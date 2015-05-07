library(ggplot2)

setwd("~/Documents/git/cocolab/modals/experiments/creature_evidence_3/Submiterator-master")

d = read.table("~/Documents/git/cocolab/modals/experiments/creature_evidence_3/Submiterator-master/creature-evidence-3-trials.tsv",sep="\t",header=T)
head(d)

# question4_response is "o" somewhere and this ruins everything

d$question4_response <- as.integer(as.character(d$question4_response))
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

d = subset(d, select = c(workerid,item,evidence_type,freq,response,worker_score))

table(d[d$evidence_type=="indirect",]$freq,d[d$evidence_type=="indirect",]$item)

aggregate(response~freq*evidence_type*item,d,mean)

d_trim = d[d$worker_score > 13,]

aggregate(response~freq*evidence_type*item,d_trim,mean) -> strength_scores

write.csv(file="strength_scores.csv",strength_scores)

d_trim$item <- factor(d_trim$item)
d_trim$evidence_type <- factor(d_trim$evidence_type)
d_trim$freq <- factor(d_trim$freq)

d_trim = na.omit(d_trim)

# plots by item

d.s <- bootsSummary(data=d_trim, measurevar="response", groupvars=c("item","evidence_type","freq"))

p1 <- ggplot(d.s, aes(x=evidence_type, y=response, fill=freq)) +
geom_bar(stat="identity",position=position_dodge()) +
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=evidence_type, width=0.1),position=position_dodge(width=0.9))+
  facet_grid(.~item)+
  ylab("strength")
p1
ggsave(filename="evidence-by-item.png",plot=p1,width=8,height=3)

# collapsing over items

d2.s <- bootsSummary(data=d_trim, measurevar="response", groupvars=c("evidence_type","freq"))
p2 <- ggplot(d2.s, aes(x=evidence_type, y=response, fill=freq)) +
  geom_bar(stat="identity",position=position_dodge())+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=evidence_type, width=0.1),position=position_dodge(width=0.9))+
  ylab("strength") +
  ylim(0,1)
p2
ggsave(filename="evidence-by-type.png",plot=p2,width=8,height=3)

