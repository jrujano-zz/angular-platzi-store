import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(objects: object[], id: string): any {

    const countedObjects: object[] = [];

    for (const object of objects) {
      const countObject: any = countedObjects.find(obj => obj[id] === object[id]);
      if (countObject) {
        countObject.quantity++;
      }else{
        countedObjects.push({...object, quantity: 1});
      }
    }

    return countedObjects;
  }
}
