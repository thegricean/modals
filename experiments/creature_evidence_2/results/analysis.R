library(ggplot2)

summarySE <- function(data=NULL, measurevar, groupvars=NULL, na.rm=FALSE,
                      conf.interval=.95, .drop=TRUE) {
  require(plyr)
  
  # New version of length which can handle NA's: if na.rm==T, don't count them
  length2 <- function (x, na.rm=FALSE) {
    if (na.rm) sum(!is.na(x))
    else       length(x)
  }
  
  # This does the summary. For each group's data frame, return a vector with
  # N, mean, and sd
  datac <- ddply(data, groupvars, .drop=.drop,
                 .fun = function(xx, col) {
                   c(N    = length2(xx[[col]], na.rm=na.rm),
                     mean = mean   (xx[[col]], na.rm=na.rm),
                     sd   = sd     (xx[[col]], na.rm=na.rm)
                   )
                 },
                 measurevar
  )
  
  # Rename the "mean" column    
  datac <- rename(datac, c("mean" = measurevar))
  
  datac$se <- datac$sd / sqrt(datac$N)  # Calculate standard error of the mean
  
  # Confidence interval multiplier for standard error
  # Calculate t-statistic for confidence interval: 
  # e.g., if conf.interval is .95, use .975 (above/below), and use df=N-1
  ciMult <- qt(conf.interval/2 + .5, datac$N-1)
  datac$ci <- datac$se * ciMult
  
  return(datac)
}

setwd("~/Documents/git/cocolab/modals/experiments/creature_evidence_2/Submiterator-master")

d = read.table("creature-evidence-2-trials.tsv",sep="\t",header=T)
head(d)

a = d[is.na(d$evidence_type),]

table(d[d$evidence_type=="indirect",]$freq,d[d$evidence_type=="indirect",]$item)

aggregate(response~freq*evidence_type,d,mean)

d$item <- factor(d$item)
d$evidence_type <- factor(d$evidence_type)
d$freq <- factor(d$freq)


d.summary <- summarySE(d, measure="response", groupvars=c("item","evidence_type", "freq"))
p1 <- ggplot(d.summary, aes(x=evidence_type, y=response, fill=freq)) +
  geom_bar(stat="identity",position=position_dodge()) +
  geom_errorbar(aes(ymin=response-ci, ymax=response+ci),position=position_dodge()) +
  facet_grid(.~item)
p1
ggsave(filename="evidence-by-item.png",plot=p1,width=8,height=3)

d2.summary <- summarySE(d, measure="response", groupvars=c("evidence_type", "freq"))
p2 <- ggplot(d2.summary, aes(x=evidence_type, y=response, fill=freq)) +
  geom_bar(stat="identity",position=position_dodge())+
  geom_errorbar(aes(ymin=response-ci, ymax=response+ci),position=position_dodge()) +
  ylim(0,1)
p2
ggsave(filename="evidence-by-type.png",plot=p2,width=8,height=3)

aggregate(response~item,mean,data=d[d$evidence_type=="direct",])
aggregate(response~item,mean,data=d[d$evidence_type=="report",])
aggregate(response~freq*item,mean,data=d[d$evidence_type=="indirect",])
