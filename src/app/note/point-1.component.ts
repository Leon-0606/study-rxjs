import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscriber } from 'rxjs';

@Component({
  selector: 'app-point-1',
  template: '',
})
export class Point1Component implements OnInit {
  ngOnInit() {
    /**
     * Observable只有被订阅了 里面的函数才会执行 是惰性的
     * 有一个observer订阅了，那么Observable内部函数就会被执行一次，注意每次都是独立的
     *  */
    const observable = new Observable((subscriber: Subscriber<number>) => {
      let number = 0;
      setTimeout(() => {
        // next 代表当前订阅向外发送数据
        subscriber.next(number++);
      }, 1000);
      setTimeout(() => {
        // error 当前订阅出错出错，一旦出错，Observable就会终止（之后的next将没有效果）
        // subscriber.error('发生错误了');
      }, 2000);
      setTimeout(() => {
        subscriber.next(number++);
      }, 3000);
      setTimeout(() => {
        // complete 代表这个订阅结束，Observable也会终止（之后的next没有用）
        subscriber.complete();
      }, 4000);
      setTimeout(() => {
        subscriber.next(number++);
      }, 5000);
    });

    // 代表观察者 有三个方法可以监听到该订阅的消息
    const observer1: Observer<number> = {
      next: (value) => {
        console.log(value, 'observer1');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    };
    const observer2: Observer<number> = {
      next: (value) => {
        console.log(value, 'observer2');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    };

    observable.subscribe(observer1);
    setTimeout(() => {
      observable.subscribe(observer2);
    }, 2000);
  }
}
