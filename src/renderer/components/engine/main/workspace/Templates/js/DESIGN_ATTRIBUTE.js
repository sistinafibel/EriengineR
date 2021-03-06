let attribute = {}


attribute.type = {

  name: '타입',
  description: '객체의 타입을 선택합니다.',
  list: ['image', 'text', 'square', 'circle', 'sprite', 'video']

}

attribute.className = {

  name: '카테고리',
  description: '객체의 카테고리를 지정할 수 있습니다. 여러개의 카테고리를 지정하고 싶다면, 띄어쓰기로 구분하세요.'

}

attribute.loop = {

  name: '반복',
  description: '비디오나, 스프라이트 객체일 경우 재생이 끝나면 자동으로 반복할지 지정합니다.',
  list: ['false', 'true']

}

attribute.text = {

  name: '글 내용',
  description: '텍스트 객체일 경우, 이 글자가 보여집니다.'

}

attribute.timescale = {

  name: '시간 지연',
  description: '이 객체에 흐르는 시간의 속도를 결정합니다. 재생 속도나, 애니메이션 속도에 영향을 주지만, 물리 효과는 영향을 받지 않습니다.'

}

attribute.physics = {

  name: '물리 효과',
  description: '이 객체가 물리 효과를 받는지 여부를 결정합니다.',
  list: ['null', 'static', 'dynamic']

}

attribute.density = {

  name: '질량',
  description: '객체의 무게는 부피와 질량에 비례합니다. 만일 부피는 유지하고, 무게를 변경하고 싶다면 이 수치를 조절하십시오.',

}

attribute.friction = {

  name: '마찰력',
  description: '가령 얼음을 표현하고 싶다면 이 수치를 낮게 조절하십시오.'

}

attribute.restitution = {

  name: '탄성',
  description: '객체가 다른 객체에 부딪쳐 튕겨나올 때 어느정도의 탄성을 가지는지 지정합니다.'

}

attribute.fixedrotation = {

  name: '회전 여부',
  description: '객체가 물리 효과를 받았을 때, 회전하는 것을 허락할지 결정합니다.',
  list: ['false', 'true']

}

attribute.gravityscale = {

  name: '중력 비중',
  description: '지정된 수치만큼 더 강한 중력을 받습니다.'

}


export default attribute