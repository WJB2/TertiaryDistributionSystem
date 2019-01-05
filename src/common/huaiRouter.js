export default [
  {
    path:'/home',
    models:['option/cherkCardUseRecord'],
    isExact:true,
    component:()=>import('../routes/cherkcarduserecord/CherkCardUseRecordIndex'),
  },
  {
    path:'/sales',
    models:['option/sales'],
    isExact:true,
    component:()=>import('../routes/sales/SalesIndex'),
  },
  {
    path:'/add',
    models:['option/add'],
    isExact:true,
    component:()=>import('../routes/addbusiness/AddBusinessIndex'),
  },
  {
    path:'/sound',
    models:['option/sound'],
    isExact:true,
    component:()=>import("../routes/sound/SoundIndex"),
  },
  {
    path:'/analyze',
    models:['option/analyze'],
    isExact:true,
    component:()=>import("../routes/analyze/AnalyzeIndex"),
  }
];
