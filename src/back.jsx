/* useEffect(() => {
  if(isMobile){
    window.addEventListener('touchstart', handleTouchStart, { passive: false })

    function handleTouchStart(event){
      console.log(state)
      const pageX = event.touches[0].pageX
      const pageY = event.touches[0].pageY
      const element = document.elementFromPoint(pageX,pageY)

      // 要素が取得できなかったら何もしない
      if(element === null){
        return
      }
      // グリッドのセルをタッチしたとき
      if(element.id.startsWith('note[')){
        //dispatch({type: "setTouchTargetId", payload: element.id})
        dispatch({type: "toggleActivationOfNote", payload: {octave: element.dataset.octave, row: element.dataset.tone, col: element.dataset.note}})
        console.log('start')

        function handleTouchMove(e){
          console.log('move')
          const pageX = e.touches[0].pageX
          const pageY = e.touches[0].pageY
          // タッチ座標から要素を取得
          const element = document.elementFromPoint(pageX,pageY)
          // 要素が取得できなかった、またはセルじゃないとき
          if(element === null || element.id.startsWith('note[') === false){
            return
          }
          // 対象セルが変わったとき
          if(state.touchTargetId !== element.id){
            console.log(state.touchTargetId)
            console.log(element.id)
            //dispatch({type: "setTouchTargetId", payload: element.id})
            dispatch({type: "toggleActivationOfNote", payload: {octave: element.dataset.octave, row: element.dataset.tone, col: element.dataset.note}})
          }
        }

        function handleTouchEnd(){
          console.log('end')
          window.removeEventListener('touchmove', handleTouchMove, { passive: false })
          window.removeEventListener('touchend', handleTouchEnd, { passive: false })
        }

        window.addEventListener('touchmove', handleTouchMove, { passive: false })
        window.addEventListener('touchend', handleTouchEnd, { passive: false })

        event.preventDefault()
      }
    }
  }
},[]) */