import { Directive, ElementRef } from '@angular/core';
import * as interact from 'interactjs';

@Directive({
    selector: '[CDDraggable]'
})

class MakeDraggableDirective {

    constructor(private el: ElementRef) {
        const currentEl = el.nativeElement;
        interact(currentEl).draggable({
            inertia: true,
            restrict: {
              restriction: '.ant-modal-wrap ',
              elementRect: { top:  10, left: 0, bottom: 0, right: 0 }
            },
            autoScroll: true,
            onmove: dragMoveListener,
            onend (event) {
              const textEl = event.target.querySelector('p');
              textEl && (textEl.textContent = 'moved a distance of ' + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0)).toFixed(2) + 'px');
            }
          });

        function dragMoveListener (event) {
            const target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
            target.style.transform =
              'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }

          // this is used later in the resizing and gesture demos
        //   window.dragMoveListener = dragMoveListener;
    }
}

export { MakeDraggableDirective };
