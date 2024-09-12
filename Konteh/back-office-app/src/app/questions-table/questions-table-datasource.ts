import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IGetAllQuestionsResponse, QuestionCategory, QuestionClient, QuestionType } from '../api/api-reference';

export interface Question{
  id: number;
  text : string;
  category: QuestionCategory;
  type: QuestionType;
  filter: string
}


const QUESTIONS: IGetAllQuestionsResponse[] = [
  {id: 1, text: 'What is the command to get the current status of the Git repository?', category: QuestionCategory.Git, type: QuestionType.Checkbox},
  {id: 2, text: 'Question number 2', category: 1, type: 1},
  {id: 3, text: 'Question number 3', category: 1, type: 1},
  {id: 4, text: 'Question number 4', category: 1, type: 1},
  {id: 5, text: 'Question number 5', category: 5, type: 1},
  {id: 6, text: 'Question number 6', category: 1, type: 1},
  {id: 7, text: 'Question number 7', category: 1, type: 1},
  {id: 8, text: 'What is the correct way to create an object called myObj of MyClass?', category: QuestionCategory.CSharp, type: 1}

]

/**
 * Data source for the QuestionsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QuestionsTableDataSource extends DataSource<IGetAllQuestionsResponse> {
  data: IGetAllQuestionsResponse[] = QUESTIONS;
  filter: string = '';
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  private getFilteredData(data: IGetAllQuestionsResponse[]): IGetAllQuestionsResponse[] {
    if (!this.filter.trim()) {
      return data;
    }
    return data.filter(item => item.text?.toLowerCase().includes(this.filter.toLowerCase()));
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IGetAllQuestionsResponse[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getFilteredData([...this.data]) );//return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IGetAllQuestionsResponse[]): IGetAllQuestionsResponse[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: IGetAllQuestionsResponse[]): IGetAllQuestionsResponse[] {
  //   if (!this.sort || !this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     const isAsc = this.sort?.direction === 'asc';
  //     switch (this.sort?.active) {
  //       case 'name': return compare(a.text, b.text, isAsc);
  //       case 'id': return compare(+a.id, +b.id, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
