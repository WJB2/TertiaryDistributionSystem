module.exports={
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data:[]
  },
  series: [
    {
      name:'淮哥是男神',
      type:'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[
        {value:50, name:'家'},
        {value:20, name:'宝'},
        {value:20, name:'男'},
        {value:10, name:'神'},
      ]
    }
  ]
}
