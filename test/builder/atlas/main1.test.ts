import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import atlas from "../../../builder/atlas/main1.ts";
import optimize from "../../../optimizer/optimize.ts";
import paths from "../../util/paths.ts";
import split from "../../../builder/atlas/splitter.ts";

Deno.test(
  "Atlas",
  (_) =>
    assertEquals(
      ((r) => [r[0], r[1], r[2]])(
        atlas()(split()(optimize()(paths))),
      ),
      [
        [
          "GET",
          "POST",
          "HEAD",
          "DELETE",
        ],
        [
          [
            1,
            2,
            4,
          ],
          [
            1,
          ],
          [
            1,
          ],
          [
            1,
          ],
        ],
        [
          [
            ["/", "/test"],
            ["/test/"],
            ["/test/:id/:name/"],
          ],
          [
            ["/"],
          ],
          [
            ["/"],
          ],
          [
            ["/"],
          ],
        ],
      ],
    ),
);
Deno.test(
  "Atlas",
  (_) =>
    assertEquals(
      atlas()(split()(optimize()([...paths,
      { path: "/hello/*", f: () => "wild" },
      { path: "/hello/nested/*", f: () => "card" },
      { type: "static", path: "./test/", name: "/static/" },
      ])))[4].slice(0, -2) as unknown as null,

      [
        [
          "GET",
        ],
        [
          [
            2,
            3
          ],
        ],
        [
          [
            ["/hello/", "/static/"],
            ["/hello/nested/"],
          ],
        ],
      ],
    ),
);