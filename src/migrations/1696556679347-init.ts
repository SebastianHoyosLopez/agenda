import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1696556679347 implements MigrationInterface {
    name = 'Init1696556679347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_reservation_access_level_enum" AS ENUM('40', '50')`);
        await queryRunner.query(`CREATE TABLE "users_reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."users_reservation_access_level_enum" NOT NULL, "user_id" uuid, "reservation_date" TIMESTAMP, CONSTRAINT "PK_a74c06570dd54e52ffa655ef45a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("date" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "hour" character varying NOT NULL, "place" character varying NOT NULL, CONSTRAINT "PK_d703ccf204a7235dffb29f556f3" PRIMARY KEY ("date"))`);
        await queryRunner.query(`ALTER TABLE "users_reservation" ADD CONSTRAINT "FK_07a31ea5c0493a9d9c8608be6f3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_reservation" ADD CONSTRAINT "FK_31267fa2c7241e0dfdb946a6bee" FOREIGN KEY ("reservation_date") REFERENCES "reservations"("date") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_reservation" DROP CONSTRAINT "FK_31267fa2c7241e0dfdb946a6bee"`);
        await queryRunner.query(`ALTER TABLE "users_reservation" DROP CONSTRAINT "FK_07a31ea5c0493a9d9c8608be6f3"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "users_reservation"`);
        await queryRunner.query(`DROP TYPE "public"."users_reservation_access_level_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
