require 'test_helper'

class PlayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @player = players(:one)
  end

  test "should get index" do
    get players_url, as: :json
    assert_response :success
  end

  test "should create player" do
    assert_difference('Player.count') do
      post players_url, params: { player: { 1st: @player.1st, 1st%: @player.1st%, 20+: @player.20+, 40+: @player.40+, Att: @player.Att, Att/G: @player.Att/G, Avg: @player.Avg, FUM: @player.FUM, Lng: @player.Lng, Player: @player.Player, Pos: @player.Pos, TD: @player.TD, Team: @player.Team, Yds: @player.Yds, Yds/G: @player.Yds/G } }, as: :json
    end

    assert_response 201
  end

  test "should show player" do
    get player_url(@player), as: :json
    assert_response :success
  end

  test "should update player" do
    patch player_url(@player), params: { player: { 1st: @player.1st, 1st%: @player.1st%, 20+: @player.20+, 40+: @player.40+, Att: @player.Att, Att/G: @player.Att/G, Avg: @player.Avg, FUM: @player.FUM, Lng: @player.Lng, Player: @player.Player, Pos: @player.Pos, TD: @player.TD, Team: @player.Team, Yds: @player.Yds, Yds/G: @player.Yds/G } }, as: :json
    assert_response 200
  end

  test "should destroy player" do
    assert_difference('Player.count', -1) do
      delete player_url(@player), as: :json
    end

    assert_response 204
  end
end
