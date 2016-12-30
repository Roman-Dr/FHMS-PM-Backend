define({ "api": [
  {
    "type": "post",
    "url": "/user/",
    "title": "Create a new single user.",
    "name": "AddUser",
    "group": "Benutzerverwaltung",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/users.js",
    "groupTitle": "Benutzerverwaltung"
  },
  {
    "type": "delete",
    "url": "/user/:id",
    "title": "Delete an existing user.",
    "name": "DeleteUser",
    "group": "Benutzerverwaltung",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique identifier.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/users.js",
    "groupTitle": "Benutzerverwaltung"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Retrieve an existing user by his id.",
    "name": "GetUser",
    "group": "Benutzerverwaltung",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique identifier.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/users.js",
    "groupTitle": "Benutzerverwaltung"
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "Get all users.",
    "name": "GetUsers",
    "group": "Benutzerverwaltung",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "users.id",
            "description": "<p>Users unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.lastName",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "users.birthDate",
            "description": "<p>Date of birth of the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/users.js",
    "groupTitle": "Benutzerverwaltung"
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Update an existing user.",
    "name": "UpdateUser",
    "group": "Benutzerverwaltung",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique identifier.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>Date of birth of the user.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/users.js",
    "groupTitle": "Benutzerverwaltung"
  },
  {
    "type": "post",
    "url": "/projects/",
    "title": "Create a new project.",
    "name": "AddProject",
    "group": "Multiprojektfaehigkeit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "displayName",
            "description": "<p>Name of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Short description of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dueDate",
            "description": "<p>Deadline of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "owner",
            "description": "<p>Identifier of the project owner.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId[]",
            "optional": false,
            "field": "stakeholders",
            "description": "<p>List of stakeholders.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId[]",
            "optional": false,
            "field": "contributors",
            "description": "<p>List of contributors.</p>"
          }
        ]
      }
    },
    "description": "<p>Sample request: { &quot;displayName&quot;: &quot;Miraclelist&quot;, &quot;description&quot;: &quot;Ein Klon von Wunderlist - nur viel toller!&quot;, &quot;dueDate&quot;: &quot;2017-01-31&quot;, &quot;owner&quot;:&quot;584ee64035141e2f8006dee8&quot;, &quot;stakeholders&quot;: [&quot;584edcda8138b903c8738e12&quot;, &quot;584ee76281946b3a14242877&quot;], &quot;contributors&quot;: [&quot;584ee64035141e2f8006dee8&quot;] }</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "ObjectId",
            "optional": false,
            "field": "Unique",
            "description": "<p>identifier of the new project.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"5866c1212867481cd4fed616\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/projects.js",
    "groupTitle": "Multiprojektfaehigkeit"
  },
  {
    "type": "delete",
    "url": "/projects/:id",
    "title": "Delete an existing project.",
    "name": "DeleteProject",
    "group": "Multiprojektfaehigkeit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Projects unique identifier.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/projects.js",
    "groupTitle": "Multiprojektfaehigkeit"
  },
  {
    "type": "get",
    "url": "/projects/:id",
    "title": "Retrive one project by its identifier.",
    "name": "GetProject",
    "group": "Multiprojektfaehigkeit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Projects unique identifier.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Projects unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "displayName",
            "description": "<p>Name of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Short description of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "dueDate",
            "description": "<p>Deadline of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "owner",
            "description": "<p>Identifier of the project owner.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "stakeholders",
            "description": "<p>List of stakeholders.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "contributors",
            "description": "<p>List of contributors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5866bf884ad5122f20a43c16\",\n    \"owner\": \"584ee64035141e2f8006dee8\",\n    \"dueDate\": \"2017-01-31T00:00:00.000Z\",\n    \"description\": \"Ein Klon von Wunderlist - nur viel toller!\",\n    \"displayName\": \"Miraclelist\",\n    \"contributors\": [\"584ee64035141e2f8006dee8\"],\n    \"stakeholders\": [\"584edcda8138b903c8738e12\",\"584ee76281946b3a14242877\"]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/projects.js",
    "groupTitle": "Multiprojektfaehigkeit"
  },
  {
    "type": "get",
    "url": "/projects/",
    "title": "Get all projects.",
    "name": "GetProjects",
    "group": "Multiprojektfaehigkeit",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Project[]",
            "optional": false,
            "field": "projects",
            "description": "<p>List of projects.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "projects.id",
            "description": "<p>Projects unique identifier.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projects.displayName",
            "description": "<p>Name of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projects.description",
            "description": "<p>Short description of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "projects.dueDate",
            "description": "<p>Deadline of the project.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "projects.owner",
            "description": "<p>Identifier of the project owner.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "projects.stakeholders",
            "description": "<p>List of stakeholders.</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId[]",
            "optional": false,
            "field": "projects.contributors",
            "description": "<p>List of contributors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n {\n     \"_id\": \"5866bf884ad5122f20a43c16\",\n     \"owner\": \"584ee64035141e2f8006dee8\",\n     \"dueDate\": \"2017-01-31T00:00:00.000Z\",\n     \"description\": \"Ein Klon von Wunderlist - nur viel toller!\",\n     \"displayName\": \"Miraclelist\",\n     \"contributors\": [\"584ee64035141e2f8006dee8\"],\n     \"stakeholders\": [\"584edcda8138b903c8738e12\",\"584ee76281946b3a14242877\"]\n },\n {\n     \"_id\": \"5866c2252867481cd4fed617\",\n     \"owner\": \"584ee76281946b3a14242877\",\n     \"dueDate\": \"2017-10-01T00:00:00.000Z\",\n     \"description\": \"Ein Spiel für die kurze Pause!\",\n     \"displayName\": \"TicTacToe\",\n     \"contributors\": [\"584edcda8138b903c8738e12\",\"584ee76281946b3a14242877\"],\n     \"stakeholders\": [\"584edcda8138b903c8738e12\"]\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/projects.js",
    "groupTitle": "Multiprojektfaehigkeit"
  },
  {
    "type": "put",
    "url": "/projects/:id",
    "title": "Update an existing project.",
    "name": "UpdateProject",
    "group": "Multiprojektfaehigkeit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "id",
            "description": "<p>Projects unique identifier.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "displayName",
            "description": "<p>Name of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Short description of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dueDate",
            "description": "<p>Deadline of the project.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "owner",
            "description": "<p>Identifier of the project owner.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId[]",
            "optional": false,
            "field": "stakeholders",
            "description": "<p>List of stakeholders.</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId[]",
            "optional": false,
            "field": "contributors",
            "description": "<p>List of contributors.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "ObjectId",
            "optional": false,
            "field": "Unique",
            "description": "<p>identifier of the new project.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/projects.js",
    "groupTitle": "Multiprojektfaehigkeit"
  }
] });
