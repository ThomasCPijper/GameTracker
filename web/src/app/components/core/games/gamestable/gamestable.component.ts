import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameProgress } from '../../types/GameProgress.enum';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-gamestable',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './gamestable.component.html',
  styleUrl: './gamestable.component.css'
})
export class GamestableComponent {
  games = [
    {
      name: "Catan met de boysssssssssssssssssssssssssssssssssssssssssssss",
      game: "Catan",
      playedAt: new Date(),
      result: [
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a0", // 56thomasp56@gmail.com as testdata
          place: "1st"
        },
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "2nd"
        },
        { 
          playerId: "1c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "4nd"
        }
      ],
      players: 3,
      host: "", // id of player
      progress: GameProgress.Finished
    },
    {
      name: "Catan met de boysssssssssssssssssssssssssssssssssssssssssssss",
      game: "Catan",
      playedAt: new Date(),
      result: [
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a0", // 56thomasp56@gmail.com as testdata
          place: "2nd"
        },
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "1st"
        },
        { 
          playerId: "1c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "4nd"
        }
      ],
      players: 3,
      host: "", // id of player
      progress: GameProgress.Canceled
    },
    {
      name: "Catan met de boysssssssssssssssssssssssssssssssssssssssssssss",
      game: "Catan",
      playedAt: new Date(),
      result: [
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a0", // 56thomasp56@gmail.com as testdata
          place: "3rd"
        },
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "1st"
        },
        { 
          playerId: "1c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "4nd"
        }
      ],
      players: 3,
      host: "", // id of player
      progress: GameProgress.Playing
    },
    {
      name: "Catan met de boysssssssssssssssssssssssssssssssssssssssssssss",
      game: "Catan",
      playedAt: new Date(),
      result: [
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a0", // 56thomasp56@gmail.com as testdata
          place: "4th"
        },
        { 
          playerId: "2c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "1st"
        },
        { 
          playerId: "1c0fc759-86d6-46c4-af7c-71249956b0a1", // non-existant player
          place: "2nd"
        }
      ],
      players: 3,
      host: "", // id of player
      progress: GameProgress.Finished
    }
  ]
}
