const fakeData = [
  {
    "message_id": 47575,
    "groupName": "lobby",
    "text": "hello",
    "username": "Bob",
    "github_handle": "ascherj",
    "campus": "hr-bge",
    "created_at": "2022-01-27T22:09:39.342Z",
    "updated_at": "2022-01-27T22:09:39.342Z"
  },
  {
    "message_id": 47574,
    "groupName": "ff",
    "text": "test",
    "username": "Bill",
    "github_handle": "ascherj",
    "campus": "hr-bge",
    "created_at": "2022-01-27T22:00:33.657Z",
    "updated_at": "2022-01-27T22:00:33.657Z"
  },
  {
    "message_id": 47569,
    "groupName": "lobby",
    "text": "Hi",
    "username": "Nic",
    "github_handle": "NicLed",
    "campus": "hr-bge",
    "created_at": "2022-01-26T04:39:23.350Z",
    "updated_at": "2022-01-26T04:39:23.350Z"
  },
  {
    "message_id": 47450,
    "groupName": "lobby",
    "text": "it does not like apostrophes",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:34:49.983Z",
    "updated_at": "2022-01-18T02:34:49.983Z"
  },
  {
    "message_id": 47449,
    "groupName": "lobby",
    "text": "'",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:34:30.534Z",
    "updated_at": "2022-01-18T02:34:30.534Z"
  },
  {
    "message_id": 47448,
    "groupName": "lobby",
    "text": "what happened there hmm",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:29:07.575Z",
    "updated_at": "2022-01-18T02:29:07.575Z"
  },
  {
    "message_id": 47447,
    "groupName": "lobby",
    "text": "hmm why is this overwriting that's weird",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:26:22.850Z",
    "updated_at": "2022-01-18T02:26:22.850Z"
  },
  {
    "message_id": 47446,
    "groupName": "lobby",
    "text": "YAY",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:26:08.822Z",
    "updated_at": "2022-01-18T02:26:08.822Z"
  },
  {
    "message_id": 47445,
    "groupName": "lobby",
    "text": "y u no post when i click submit agh",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:26:04.594Z",
    "updated_at": "2022-01-18T02:26:04.594Z"
  },
  {
    "message_id": 47444,
    "groupName": "lobby",
    "text": "sdrlkdfg",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:22:22.220Z",
    "updated_at": "2022-01-18T02:22:22.220Z"
  },
  {
    "message_id": 47443,
    "groupName": "lobby",
    "text": "ugfyd",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:19:39.830Z",
    "updated_at": "2022-01-18T02:19:39.830Z"
  },
  {
    "message_id": 47442,
    "groupName": "lobby",
    "text": "gfchvjkn",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:11:17.629Z",
    "updated_at": "2022-01-18T02:11:17.629Z"
  },
  {
    "message_id": 47441,
    "groupName": "lobby",
    "text": "ljlksdwf",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:07:28.403Z",
    "updated_at": "2022-01-18T02:07:28.403Z"
  },
  {
    "message_id": 47440,
    "groupName": "lobby",
    "text": "ihfijeqha",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:07:00.062Z",
    "updated_at": "2022-01-18T02:07:00.062Z"
  },
  {
    "message_id": 47439,
    "groupName": "lobby",
    "text": "",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:05:24.082Z",
    "updated_at": "2022-01-18T02:05:24.082Z"
  },
  {
    "message_id": 47438,
    "groupName": "lobby",
    "text": "is this working",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:04:12.106Z",
    "updated_at": "2022-01-18T02:04:12.106Z"
  },
  {
    "message_id": 47436,
    "groupName": "lobby",
    "text": "i fixed it woo",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:01:05.259Z",
    "updated_at": "2022-01-18T02:01:05.259Z"
  },
  {
    "message_id": 47435,
    "groupName": "lobby",
    "text": "i fixed it woo",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:01:04.307Z",
    "updated_at": "2022-01-18T02:01:04.307Z"
  },
  {
    "message_id": 47434,
    "groupName": "lobby",
    "text": "uh-oh what did i do",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T02:00:44.507Z",
    "updated_at": "2022-01-18T02:00:44.507Z"
  },
  {
    "message_id": 47426,
    "groupName": "lobby",
    "text": "hi",
    "username": "jenny",
    "github_handle": "jennygiri",
    "campus": "hr-bge",
    "created_at": "2022-01-18T01:56:04.150Z",
    "updated_at": "2022-01-18T01:56:04.150Z"
  },
  {
    "message_id": 47290,
    "groupName": "FPV_4lyfe",
    "text": "hello",
    "username": "jlk",
    "github_handle": "JesseKovash",
    "campus": "hr-bge",
    "created_at": "2022-01-17T02:03:27.206Z",
    "updated_at": "2022-01-17T02:03:27.206Z"
  },
  {
    "message_id": 47288,
    "groupName": "FPV_4lyfe",
    "text": "",
    "username": "jlk",
    "github_handle": "JesseKovash",
    "campus": "hr-bge",
    "created_at": "2022-01-17T00:43:57.481Z",
    "updated_at": "2022-01-17T00:43:57.481Z"
  },
  {
    "message_id": 47287,
    "groupName": "FPV_4lyfe",
    "text": "",
    "username": "jlk",
    "github_handle": "JesseKovash",
    "campus": "hr-bge",
    "created_at": "2022-01-17T00:42:38.353Z",
    "updated_at": "2022-01-17T00:42:38.353Z"
  },
  {
    "message_id": 47286,
    "groupName": "FPV_4lyfe",
    "text": "",
    "username": "jlk",
    "github_handle": "JesseKovash",
    "campus": "hr-bge",
    "created_at": "2022-01-17T00:29:54.269Z",
    "updated_at": "2022-01-17T00:29:54.269Z"
  },
  {
    "message_id": 47285,
    "groupName": "conference",
    "text": "meeting",
    "username": "y",
    "github_handle": "fgholizadeh",
    "campus": "hr-bge",
    "created_at": "2022-01-17T00:22:26.294Z",
    "updated_at": "2022-01-17T00:22:26.294Z"
  },
  {
    "message_id": 47240,
    "groupName": "ff",
    "text": "444444444",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T22:37:35.765Z",
    "updated_at": "2022-01-16T22:37:35.765Z"
  },
  {
    "message_id": 47239,
    "groupName": "ff",
    "text": "ewqrf",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T22:34:56.611Z",
    "updated_at": "2022-01-16T22:34:56.611Z"
  },
  {
    "message_id": 47238,
    "groupName": null,
    "text": null,
    "username": null,
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-16T22:04:26.811Z",
    "updated_at": "2022-01-16T22:04:26.811Z"
  },
  {
    "message_id": 47237,
    "groupName": null,
    "text": null,
    "username": null,
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-16T22:03:44.201Z",
    "updated_at": "2022-01-16T22:03:44.201Z"
  },
  {
    "message_id": 47236,
    "groupName": null,
    "text": null,
    "username": null,
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-16T21:59:12.451Z",
    "updated_at": "2022-01-16T21:59:12.451Z"
  },
  {
    "message_id": 47235,
    "groupName": null,
    "text": null,
    "username": null,
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-16T21:58:30.442Z",
    "updated_at": "2022-01-16T21:58:30.442Z"
  },
  {
    "message_id": 47234,
    "groupName": null,
    "text": null,
    "username": null,
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-16T21:58:20.382Z",
    "updated_at": "2022-01-16T21:58:20.382Z"
  },
  {
    "message_id": 47233,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T19:00:02.983Z",
    "updated_at": "2022-01-16T19:00:02.983Z"
  },
  {
    "message_id": 47232,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:58:56.316Z",
    "updated_at": "2022-01-16T18:58:56.316Z"
  },
  {
    "message_id": 47231,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:57:41.444Z",
    "updated_at": "2022-01-16T18:57:41.444Z"
  },
  {
    "message_id": 47230,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:56:46.863Z",
    "updated_at": "2022-01-16T18:56:46.863Z"
  },
  {
    "message_id": 47229,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:56:41.646Z",
    "updated_at": "2022-01-16T18:56:41.646Z"
  },
  {
    "message_id": 47228,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:50:27.685Z",
    "updated_at": "2022-01-16T18:50:27.685Z"
  },
  {
    "message_id": 47227,
    "groupName": "ff",
    "text": "ff",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:49:58.516Z",
    "updated_at": "2022-01-16T18:49:58.516Z"
  },
  {
    "message_id": 47226,
    "groupName": "",
    "text": "",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:47:13.228Z",
    "updated_at": "2022-01-16T18:47:13.228Z"
  },
  {
    "message_id": 47225,
    "groupName": "",
    "text": "",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:46:53.827Z",
    "updated_at": "2022-01-16T18:46:53.827Z"
  },
  {
    "message_id": 47224,
    "groupName": "",
    "text": "",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:46:22.918Z",
    "updated_at": "2022-01-16T18:46:22.918Z"
  },
  {
    "message_id": 47223,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:46:19.211Z",
    "updated_at": "2022-01-16T18:46:19.211Z"
  },
  {
    "message_id": 47222,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-16T18:42:18.786Z",
    "updated_at": "2022-01-16T18:42:18.786Z"
  },
  {
    "message_id": 46890,
    "groupName": "lobby",
    "text": "Looks like u are OK now???",
    "username": "naNoPizza",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:47:07.998Z",
    "updated_at": "2022-01-15T20:47:07.998Z"
  },
  {
    "message_id": 46889,
    "groupName": "lobby",
    "text": "Looks like u are OK now???",
    "username": "naNoPizza",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:47:07.810Z",
    "updated_at": "2022-01-15T20:47:07.810Z"
  },
  {
    "message_id": 46888,
    "groupName": "lobby",
    "text": "Looks like u are OK now???",
    "username": "naNoPizza",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:47:07.655Z",
    "updated_at": "2022-01-15T20:47:07.655Z"
  },
  {
    "message_id": 46887,
    "groupName": "lobby",
    "text": "✨✨✨✨✨✨",
    "username": "anonymous",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:45:57.724Z",
    "updated_at": "2022-01-15T20:45:57.724Z"
  },
  {
    "message_id": 46886,
    "groupName": "lobby",
    "text": "✨✨✨✨✨✨",
    "username": "anonymous",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:45:43.477Z",
    "updated_at": "2022-01-15T20:45:43.477Z"
  },
  {
    "message_id": 46864,
    "groupName": null,
    "text": "asdcasdcad",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:29:18.074Z",
    "updated_at": "2022-01-15T20:29:18.074Z"
  },
  {
    "message_id": 46863,
    "groupName": null,
    "text": "dscad",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:29:00.733Z",
    "updated_at": "2022-01-15T20:29:00.733Z"
  },
  {
    "message_id": 46861,
    "groupName": null,
    "text": "zxcv zxcz",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:27:45.049Z",
    "updated_at": "2022-01-15T20:27:45.049Z"
  },
  {
    "message_id": 46860,
    "groupName": null,
    "text": "asdcadad",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:27:01.106Z",
    "updated_at": "2022-01-15T20:27:01.106Z"
  },
  {
    "message_id": 46859,
    "groupName": null,
    "text": "adsasdca",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:26:55.274Z",
    "updated_at": "2022-01-15T20:26:55.274Z"
  },
  {
    "message_id": 46854,
    "groupName": "",
    "text": null,
    "username": "cheryl",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:25:35.643Z",
    "updated_at": "2022-01-15T20:25:35.643Z"
  },
  {
    "message_id": 46850,
    "groupName": "Lobby",
    "text": "test",
    "username": "BGE-KINGS",
    "github_handle": "Pak-Attack",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:24:09.212Z",
    "updated_at": "2022-01-15T20:24:09.212Z"
  },
  {
    "message_id": 46849,
    "groupName": null,
    "text": "HII",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:23:41.973Z",
    "updated_at": "2022-01-15T20:23:41.973Z"
  },
  {
    "message_id": 46848,
    "groupName": "",
    "text": "",
    "username": "cheryl",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:22:57.489Z",
    "updated_at": "2022-01-15T20:22:57.489Z"
  },
  {
    "message_id": 46847,
    "groupName": "",
    "text": "",
    "username": "cheryl",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:22:01.227Z",
    "updated_at": "2022-01-15T20:22:01.227Z"
  },
  {
    "message_id": 46843,
    "groupName": null,
    "text": "PROVE IT",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:20:10.524Z",
    "updated_at": "2022-01-15T20:20:10.524Z"
  },
  {
    "message_id": 46842,
    "groupName": null,
    "text": "kirby moment!!!!",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:20:09.551Z",
    "updated_at": "2022-01-15T20:20:09.551Z"
  },
  {
    "message_id": 46840,
    "groupName": null,
    "text": "hi CHIIIII",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:20:00.544Z",
    "updated_at": "2022-01-15T20:20:00.544Z"
  },
  {
    "message_id": 46837,
    "groupName": null,
    "text": "dvsdvsd",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:19:47.103Z",
    "updated_at": "2022-01-15T20:19:47.103Z"
  },
  {
    "message_id": 46835,
    "groupName": "",
    "text": "",
    "username": "sdfg",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:19:35.929Z",
    "updated_at": "2022-01-15T20:19:35.929Z"
  },
  {
    "message_id": 46830,
    "groupName": null,
    "text": "meowww",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:19:27.052Z",
    "updated_at": "2022-01-15T20:19:27.052Z"
  },
  {
    "message_id": 46825,
    "groupName": null,
    "text": "meow",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:18:22.671Z",
    "updated_at": "2022-01-15T20:18:22.671Z"
  },
  {
    "message_id": 46819,
    "groupName": "",
    "text": "text",
    "username": "sdfg",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:17:18.345Z",
    "updated_at": "2022-01-15T20:17:18.345Z"
  },
  {
    "message_id": 46817,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "TotallyTerri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:17:09.733Z",
    "updated_at": "2022-01-15T20:17:09.733Z"
  },
  {
    "message_id": 46816,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "TotallyTerri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:17:09.605Z",
    "updated_at": "2022-01-15T20:17:09.605Z"
  },
  {
    "message_id": 46815,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "TotallyTerri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:17:09.421Z",
    "updated_at": "2022-01-15T20:17:09.421Z"
  },
  {
    "message_id": 46814,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "TotallyTerri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:17:08.418Z",
    "updated_at": "2022-01-15T20:17:08.418Z"
  },
  {
    "message_id": 46813,
    "groupName": "Kirby crying room",
    "text": "this can't possibly work!",
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:17:03.995Z",
    "updated_at": "2022-01-15T20:17:03.995Z"
  },
  {
    "message_id": 46804,
    "groupName": "",
    "text": "",
    "username": "sdfg",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:15:16.274Z",
    "updated_at": "2022-01-15T20:15:16.274Z"
  },
  {
    "message_id": 46800,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:14:44.798Z",
    "updated_at": "2022-01-15T20:14:44.798Z"
  },
  {
    "message_id": 46799,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:14:43.519Z",
    "updated_at": "2022-01-15T20:14:43.519Z"
  },
  {
    "message_id": 46797,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:14:36.706Z",
    "updated_at": "2022-01-15T20:14:36.706Z"
  },
  {
    "message_id": 46796,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:14:35.907Z",
    "updated_at": "2022-01-15T20:14:35.907Z"
  },
  {
    "message_id": 46793,
    "groupName": "",
    "text": "",
    "username": "sdfg",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:14:00.181Z",
    "updated_at": "2022-01-15T20:14:00.181Z"
  },
  {
    "message_id": 46766,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:12:43.111Z",
    "updated_at": "2022-01-15T20:12:43.111Z"
  },
  {
    "message_id": 46765,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:12:42.143Z",
    "updated_at": "2022-01-15T20:12:42.143Z"
  },
  {
    "message_id": 46763,
    "groupName": "",
    "text": "{\"length\":0,\"prevObject\":{\"0\":{},\"length\":1}}",
    "username": "sdfg",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:09:58.192Z",
    "updated_at": "2022-01-15T20:09:58.192Z"
  },
  {
    "message_id": 46760,
    "groupName": null,
    "text": "vzxczcx",
    "username": "anonymous",
    "github_handle": "iamtobin",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:08:59.409Z",
    "updated_at": "2022-01-15T20:08:59.409Z"
  },
  {
    "message_id": 46758,
    "groupName": null,
    "text": null,
    "username": "Terri",
    "github_handle": "TeresaGobble",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:08:30.711Z",
    "updated_at": "2022-01-15T20:08:30.711Z"
  },
  {
    "message_id": 46744,
    "groupName": "lobby",
    "text": "fghnxfgnsfghn",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:45.204Z",
    "updated_at": "2022-01-15T20:03:45.204Z"
  },
  {
    "message_id": 46739,
    "groupName": "lobby",
    "text": "fghnxfgnsfghn",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:25.567Z",
    "updated_at": "2022-01-15T20:03:25.567Z"
  },
  {
    "message_id": 46735,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:05.140Z",
    "updated_at": "2022-01-15T20:03:05.140Z"
  },
  {
    "message_id": 46734,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:04.969Z",
    "updated_at": "2022-01-15T20:03:04.969Z"
  },
  {
    "message_id": 46733,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:04.773Z",
    "updated_at": "2022-01-15T20:03:04.773Z"
  },
  {
    "message_id": 46732,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:03.670Z",
    "updated_at": "2022-01-15T20:03:03.670Z"
  },
  {
    "message_id": 46731,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:03.091Z",
    "updated_at": "2022-01-15T20:03:03.091Z"
  },
  {
    "message_id": 46730,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:02.430Z",
    "updated_at": "2022-01-15T20:03:02.430Z"
  },
  {
    "message_id": 46729,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:01.608Z",
    "updated_at": "2022-01-15T20:03:01.608Z"
  },
  {
    "message_id": 46728,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:03:00.706Z",
    "updated_at": "2022-01-15T20:03:00.706Z"
  },
  {
    "message_id": 46727,
    "groupName": "lobby",
    "text": "😄",
    "username": "anonymous",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:02:59.711Z",
    "updated_at": "2022-01-15T20:02:59.711Z"
  },
  {
    "message_id": 46726,
    "groupName": "lobby",
    "text": "🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:02:59.151Z",
    "updated_at": "2022-01-15T20:02:59.151Z"
  },
  {
    "message_id": 46725,
    "groupName": "lobby",
    "text": "65uedtyh💕💕💕💕💕💕💕🎶🎂👏😜",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:02:21.901Z",
    "updated_at": "2022-01-15T20:02:21.901Z"
  },
  {
    "message_id": 46724,
    "groupName": "lobby",
    "text": "65uedtyh💕💕💕💕💕💕💕🎶🎂👏😜",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:02:14.241Z",
    "updated_at": "2022-01-15T20:02:14.241Z"
  },
  {
    "message_id": 46723,
    "groupName": "lobby",
    "text": "65uedtyh💕💕💕💕💕💕💕🎶🎂👏😜",
    "username": "Godly%20Yuriy!",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:02:13.149Z",
    "updated_at": "2022-01-15T20:02:13.149Z"
  },
  {
    "message_id": 46722,
    "groupName": "lobby",
    "text": "s",
    "username": "anonymous",
    "github_handle": "MiguelsPizza",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:01:52.383Z",
    "updated_at": "2022-01-15T20:01:52.383Z"
  },
  {
    "message_id": 46721,
    "groupName": "",
    "text": "{\"0\":{},\"length\":1}",
    "username": "sdfg",
    "github_handle": "Robchike9290",
    "campus": "hr-bge",
    "created_at": "2022-01-15T20:01:11.052Z",
    "updated_at": "2022-01-15T20:01:11.052Z"
  }
]

module.exports = {
  fakeData: fakeData
}