-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "description" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "leagues" (
    "id_league" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "leagues_pkey" PRIMARY KEY ("id_league")
);

-- CreateTable
CREATE TABLE "sports" (
    "id_sport" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "num_players" INTEGER NOT NULL,

    CONSTRAINT "sports_pkey" PRIMARY KEY ("id_sport")
);

-- CreateTable
CREATE TABLE "league_players" (
    "id_participation_league" SERIAL NOT NULL,
    "id_player" INTEGER NOT NULL,
    "id_league" INTEGER NOT NULL,

    CONSTRAINT "league_players_pkey" PRIMARY KEY ("id_participation_league")
);

-- CreateTable
CREATE TABLE "teams" (
    "id_team" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_league" INTEGER NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id_team")
);

-- CreateTable
CREATE TABLE "players_team" (
    "id_player_team" SERIAL NOT NULL,
    "id_team" INTEGER NOT NULL,
    "id_player" INTEGER NOT NULL,

    CONSTRAINT "players_team_pkey" PRIMARY KEY ("id_player_team")
);

-- CreateTable
CREATE TABLE "score" (
    "id_score" SERIAL NOT NULL,
    "name" INTEGER NOT NULL,
    "id_league" INTEGER NOT NULL,
    "id_team" INTEGER NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id_score")
);

-- CreateTable
CREATE TABLE "sports_custom" (
    "id_sport_custom" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "num_players" INTEGER NOT NULL,
    "id_league" INTEGER NOT NULL,

    CONSTRAINT "sports_custom_pkey" PRIMARY KEY ("id_sport_custom")
);

-- CreateTable
CREATE TABLE "sports_league" (
    "id_sport_league" SERIAL NOT NULL,
    "id_sport" INTEGER NOT NULL,
    "id_league" INTEGER NOT NULL,

    CONSTRAINT "sports_league_pkey" PRIMARY KEY ("id_sport_league")
);

-- AddForeignKey
ALTER TABLE "league_players" ADD CONSTRAINT "league_players_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_players" ADD CONSTRAINT "league_players_id_league_fkey" FOREIGN KEY ("id_league") REFERENCES "leagues"("id_league") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_id_league_fkey" FOREIGN KEY ("id_league") REFERENCES "leagues"("id_league") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_team" ADD CONSTRAINT "players_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "teams"("id_team") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players_team" ADD CONSTRAINT "players_team_id_player_fkey" FOREIGN KEY ("id_player") REFERENCES "league_players"("id_participation_league") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_id_league_fkey" FOREIGN KEY ("id_league") REFERENCES "leagues"("id_league") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "teams"("id_team") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_custom" ADD CONSTRAINT "sports_custom_id_league_fkey" FOREIGN KEY ("id_league") REFERENCES "leagues"("id_league") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_league" ADD CONSTRAINT "sports_league_id_sport_fkey" FOREIGN KEY ("id_sport") REFERENCES "sports"("id_sport") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_league" ADD CONSTRAINT "sports_league_id_league_fkey" FOREIGN KEY ("id_league") REFERENCES "leagues"("id_league") ON DELETE RESTRICT ON UPDATE CASCADE;
