import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../../modules/home/interfaces/board';
import { UserRole } from '../../modules/auth/interfaces/user';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [],
  templateUrl: './board-card.component.html',
  styleUrl: './board-card.component.scss'
})
export class BoardCardComponent implements OnInit{

  @Input() board!: Board;

  imageUrl!:string;

  ngOnInit(): void {
    if(this.board.rolePro === UserRole.COACH){
      this.imageUrl = "./assets/tool-icons/dumbbell-solid.svg"
    }
  }

}
