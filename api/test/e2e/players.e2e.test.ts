import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { api } from "../helpers/http";
import { prisma } from "../../src/shared/prisma";

describe("Players e2e tests", () => {
  let playerId: string;

  afterAll(async () => {
    await prisma.player.deleteMany({});
  });

  describe("POST /players", () => {
    it("should create a player", async () => {
      const result = await api()
        .post("/api/v1/players")
        .send({
          name: "Player e2e",
          email: "player-e2e@gmail.com"
        });

      expect(result.status).toBe(201);

      expect(result.body).toMatchObject({
        message: "Player created successfully",
        player: {
          name: "Player e2e",
          email: "player-e2e@gmail.com"
        }
      });

      playerId = result.body.player.id;
    });

    it("should return 400 when name is missing", async () => {
      const result = await api()
        .post("/api/v1/players")
        .send({
          email: "missing-name@gmail.com"
        });

      expect(result.status).toBe(400);
    });

    it("should return 400 when email is invalid", async () => {
      const result = await api()
        .post("/api/v1/players")
        .send({
          name: "Invalid Email",
          email: "invalid-email"
        });

      expect(result.status).toBe(400);
    });

    it("should return 400 when name is empty", async () => {
      const result = await api()
        .post("/api/v1/players")
        .send({
          name: "",
          email: "empty-name@gmail.com"
        });

      expect(result.status).toBe(400);
    });
  });

  describe("GET /players/:id", () => {
    it("should find a player by id", async () => {
      const result = await api()
        .get(`/api/v1/players/${playerId}`);

      expect(result.status).toBe(200);

      expect(result.body.player).toMatchObject({
        id: playerId,
        name: "Player e2e",
        email: "player-e2e@gmail.com"
      });
    });

    it("should return 404 when player does not exist", async () => {
      const result = await api()
        .get("/api/v1/players/non-existing-id");

      expect(result.status).toBe(404);
    });
  });

  describe("PATCH /players/:id", () => {
    it("should update player name", async () => {
      const result = await api()
        .patch(`/api/v1/players/${playerId}`)
        .send({
          name: "Updated Player"
        });

      expect(result.status).toBe(200);

      expect(result.body).toMatchObject({
        message: "Player updated successfully",
        player: {
          id: playerId,
          name: "Updated Player"
        }
      });
    });

    it("should update player email", async () => {
      const result = await api()
        .patch(`/api/v1/players/${playerId}`)
        .send({
          email: "updated-e2e@gmail.com"
        });

      expect(result.status).toBe(200);

      expect(result.body.player.email).toBe(
        "updated-e2e@gmail.com"
      );
    });

    it("should return 400 for empty body", async () => {
      const result = await api()
        .patch(`/api/v1/players/${playerId}`)
        .send({});

      expect(result.status).toBe(400);
    });

    it("should return 400 for invalid email", async () => {
      const result = await api()
        .patch(`/api/v1/players/${playerId}`)
        .send({
          email: "not-an-email"
        });

      expect(result.status).toBe(400);
    });

    it("should return 404 when player does not exist", async () => {
      const result = await api()
        .patch("/api/v1/players/non-existing-id")
        .send({
          name: "Test"
        });

      expect(result.status).toBe(404);
    });
  });

  describe("DELETE /players/:id", () => {
    let idToDelete: string;
    beforeAll(async () => {
      const result = await api()
        .post("/api/v1/players")
        .send({
          name: "Player e2e",
          email: "player-e2e@gmail.com"
        });
      idToDelete = result.body.player.id
    });

    it("should delete a player", async () => {
      const result = await api()
        .delete(`/api/v1/players/${idToDelete}`);

      expect(result.status).toBe(200);

      expect(result.body).toEqual({
        message: "Player deleted succesfully"
      });
    });

    it("should return 404 when player does not exist", async () => {
      const result = await api()
        .delete("/api/v1/players/non-existing-id");

      expect(result.status).toBe(404);
    });
  });
});