module.exports = {

  group: (participants)=> {
    let people = participants
    people.sort(()=> {return Math.random() - 0.5})
    let size = people.length
    let groupCount = Math.ceil(size/7);
    let groupSize = Math.ceil(size/groupCount);
    let groups = [];
    for (let i = 0; i < groupCount; i++) {
      groups[i] = people.slice(i * groupSize, groupSize * (i+1))
    }
    return groups
  },

  groupReply: (groups) => {
    let reply = '';
    for (group of groups) {
      let numGroup = groups.indexOf(group)+1
      let numRandom = group[Math.floor(Math.random()*(group.length))];
      reply += `Group ${numGroup}: ${group}\nLeader: ${numRandom}\n\n`;
    }
    return reply
  }
}
