import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../../model/player';
import { CsvService } from '../../shared/csv.service';
import { PlayerService } from '../../shared/player.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  playerData: Player[] = [];
  playerDataMaster: Player[] = [];
  teamArray: string[] = [];
  positionArray: string[] = [];
  selectedTeam: string = '';
  selectedPosition: string = '';
  playerName!: string;
  key: string = 'Player';
  reverse: boolean = false;
  p: number = 1;
  maxPlayersPerPage = 15;

  constructor(
    private playerService: PlayerService,
    private csvService: CsvService
  ) {}

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.playerService.getPlayerData().subscribe((response) => {
      // Player Data
      this.playerData = response;
      this.playerDataMaster = this.playerData;

      // Team and Position arrays (To be used in team filter)
      for (let key in response) {
        const team = response[key]['Team'];
        const position = response[key]['Pos'];
        if (this.teamArray.indexOf(response[key]['Team']) === -1) {
          this.teamArray.push(team);
        }
        if (this.positionArray.indexOf(response[key]['Pos']) === -1) {
          this.positionArray.push(position);
        }
      }
      this.teamArray.sort();
      this.positionArray.sort();
    });
  }

  search() {
    this.p = 1;
    if (this.playerName == '') {
      this.ngOnInit();
    } else {
      this.playerData = this.playerDataMaster.filter((result) => {
        return result.Player.toLocaleLowerCase().match(
          this.playerName.toLocaleLowerCase()
        );
      });
    }
  }

  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  exportCsv() {
    this.csvService.downloadFile(this.playerData, 'nfl-rushing-data');
  }

  filterData(event: any) {
    this.playerData = this.playerDataMaster;

    if (event === 'team') {
      // Case where only team filter
      if (!this.selectedPosition) {
        this.playerData = this.playerData.filter((result) => {
          return result.Team.toLocaleLowerCase().match(
            this.selectedTeam.toLocaleLowerCase()
          );
        });
      }
      // Case where team and position
      else {
        // First filter by position to get subset of Data
        this.playerData = this.playerData.filter((result) => {
          return result.Pos.toLocaleLowerCase().match(
            this.selectedPosition.toLocaleLowerCase()
          );
        });
        // Then filter subset data based on team
        this.playerData = this.playerData.filter((result) => {
          return result.Team.toLocaleLowerCase().match(
            this.selectedTeam.toLocaleLowerCase()
          );
        });
      }
    }
    if (event === 'position') {
      if (!this.selectedTeam) {
        this.playerData = this.playerData.filter((result) => {
          return result.Pos.toLocaleLowerCase().match(
            this.selectedPosition.toLocaleLowerCase()
          );
        });
      } else {
        // First filter by team to get subset of Data
        this.playerData = this.playerData.filter((result) => {
          return result.Team.toLocaleLowerCase().match(
            this.selectedTeam.toLocaleLowerCase()
          );
        });
        // Then filter subset data based on position
        this.playerData = this.playerData.filter((result) => {
          return result.Pos.toLocaleLowerCase().match(
            this.selectedPosition.toLocaleLowerCase()
          );
        });
      }
    }
  }

  clearFilters() {
    this.playerData = this.playerDataMaster;
    this.selectedPosition = '';
    this.selectedTeam = '';
  }

  // Custom comparator to sort longest rushing yards (string)
  customComparator(itemA: string | number, itemB: string | number) {
    // If data type is a string and matches an alphanumeric pattern
    if (
      typeof itemA === 'string' &&
      itemA.match('^(?=.*\\d)[a-z\\d]*$') &&
      typeof itemB === 'string' &&
      itemB.match('^(?=.*\\d)[a-z\\d]*$')
    ) {
      if (itemA.charAt(itemA.length - 1) == 'T') {
        itemA.slice(0, -1);
      }
      if (itemB.charAt(itemB.length - 1) == 'T') {
        itemB.slice(0, -1);
      }
      const integerA = parseInt(itemA);
      const integerB = parseInt(itemB);
      return integerA > integerB ? 1 : -1;
    }

    // Use default sorting for only alpha strings and numbers
    else {
      return itemA > itemB ? 1 : -1;
    }
  }
}
