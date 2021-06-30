class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :Player
      t.string :Team
      t.string :Pos
      t.integer :Att
      t.float :'Att/G'
      t.integer :Yds
      t.float :Avg
      t.float :'Yds/G'
      t.integer :TD
      t.string :Lng
      t.integer :'1st'
      t.float :'1st%'
      t.integer :'20+'
      t.integer :'40+'
      t.integer :FUM

      t.timestamps
    end
  end
end