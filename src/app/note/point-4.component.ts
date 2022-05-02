import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  map,
  mergeMap,
  scan,
  skipWhile,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'app-point-4',
  template: `
    <div id="container"></div>
    <button id="btn">添加</button>
  `,
  styles: [
    `
      #container {
        width: 100px;
        height: 100px;
        background: skyblue;
        position: absolute;
      }
      button {
        margin-top: 100px;
      }
    `,
  ],
})
export class Point4Component implements OnInit {
  ngOnInit() {
    // this._nativeDnd();
    this._rxjsDnd();
  }

  // 原生操作dom实现拖拽
  private _nativeDnd(): void {
    const container = document.querySelector('#container') as HTMLElement;
    let distanceX = 0;
    let distanceY = 0;
    const handler = (event: MouseEvent) => {
      const left = event.clientX - distanceX;
      const top = event.clientY - distanceY;
      container.style.left = `${left}px`;
      container.style.top = `${top}px`;
    };
    container.addEventListener(
      'mousedown',
      (event: MouseEvent & { target: HTMLElement }) => {
        distanceX = event.clientX - event.target.offsetLeft;
        distanceY = event.clientY - event.target.offsetTop;
        document.addEventListener('mousemove', handler);
      }
    );
    container.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handler);
    });
  }

  // 用rxjs实现拖拽
  private _rxjsDnd(): void {
    const container = document.querySelector('#container') as HTMLElement;
    fromEvent(container, 'mousedown')
      .pipe(
        map((event: MouseEvent & { target: HTMLElement }) => ({
          distanceX: event.clientX - event.target.offsetLeft,
          distanceY: event.clientY - event.target.offsetTop,
        })),
        switchMap(({ distanceX, distanceY }) => {
          return fromEvent(document, 'mousemove').pipe(
            map((event: MouseEvent) => ({
              left: event.clientX - distanceX,
              top: event.clientY - distanceY,
            })),
            takeUntil(fromEvent(container, 'mouseup'))
          );
        })
      )
      .subscribe(({ left, top }) => {
        container.style.left = `${left}px`;
        container.style.top = `${top}px`;
      });
  }

  /**
   *  skipWhile 和 filter的区别是
   *  skipWhile如果判断为false ，那么后面的判断通通会失效
   *  filter 如果判断为false 不会影响后面的过滤，它属于整个广播周期内都会生效
   */
  private _skipWhile(): void {
    const btn = document.querySelector('#btn');
    fromEvent(btn, 'click')
      .pipe(
        scan((count) => count + 1, 0),
        skipWhile((value) => {
          if (value == 5) {
            return false;
          }
          return true;
        }),
        mergeMap((res) => of(res)),
        mergeMap((res) => of(res * 10))
      )
      .subscribe(console.log);
  }
}
