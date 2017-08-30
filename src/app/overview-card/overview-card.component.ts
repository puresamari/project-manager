import { Input, Component, OnInit } from '@angular/core';
import { FileCategoriesService } from '../file-categories.service';

class Category {
  private key: string;
  private data;
  private percentage: number;

  constructor(
    key: string,
    data,
    percentage: number
  ) {
    this.key = key;
    this.data = data;
    this.percentage = percentage;
  }

  get Key(): string {
    return this.key;
  }

  get Style(): object {
    // !this.data.color && console.log(this.data);
    let color = {};
    if (this.data.color) {
      color = { backgroundColor: this.data.color };
    } else {
      color = { borderLeftStyle: 'solid' };
    }
    return {
      ...color,
      width: `${Math.ceil(this.percentage * 100)}%`
    }
  }

  get Description(): string {
    return this.data.ace_mode;
  }

}

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.css'],
  providers: [FileCategoriesService]
})
export class OverviewCardComponent implements OnInit {
  @Input() project;
  categories: Category[];
  constructor(private fileCategoriesService: FileCategoriesService) { }
  get Categories(): Category[] {
    const amount = this.project.files.length;
    const categories = this.fileCategoriesService.getFileCategories(this.project.files);
    return categories.map(({ key, data, percentage }) => new Category(key, data, percentage));
    // return [
    //   new Category('0', {}, 0.1),
    //   new Category('1', {}, 0.9)
    // ];
  }
  ngOnInit() {
    this.categories = this.Categories;
  }
}
