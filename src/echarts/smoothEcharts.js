module.exports={
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [0, 0, 0, 0, 0, 0, 0],
    type: 'line',
    smooth: true
  }]
}
