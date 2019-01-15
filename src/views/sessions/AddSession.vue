<template>
  <div class="animated fade-in">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <b-form>
              <strong>{{ caption }}</strong><small> ID: {{ sessionID }}</small>
                <small class="float-right text-muted">
                  2019/01/09 11:12:06 - Vigente
                </small>
                <b-row class="mt-3">
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" id="name" :disabled="true" v-model="userName" placeholder="Nombre">{{ userName }}</b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionDepartmentName" :disabled="true" v-model="items($route.params.idsession).sessionDepartmentName" placeholder="Departamento"></b-form-input>-->
                      <b-form-select id="department"
                        v-model="department"
                        class="form-control" :class="{ 'is-invalid': departmentValidationError }"
                        :options="departmentOptions"
                        :disabled="addSessionVar"
                        value="Departamento...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <!--<b-form-input type="text" id="sessionLocationName" :disabled="true" v-model="items($route.params.idsession).sessionLocationName" placeholder="Ubicación"></b-form-input>-->
                      <b-form-select id="sessionLocation"
                        v-model="location"
                        class="form-control" :class="{ 'is-invalid': locationValidationError }"
                        :options="locationOptions"
                        :disabled="addSessionVar"
                        value="Ubicación...">
                      </b-form-select>
                    </b-input-group>
                    <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="pull-right">
                    <b-button v-show="!addSessionVar" type="reset" size="sm" variant="danger" @click="goBack" class="mr-1"><i class="fa fa-ban"></i> Cancelar</b-button>
                    <b-button v-show="!addSessionVar" type="button" size="sm" variant="primary" @click="addSessionClicked" :disabled="!formValidated"><i class="fa fa-play"></i> Iniciar</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>

          <b-row>
            <b-col>
              <div class="text-center mb-4">
                <b-button v-show="addSessionVar" type="button" size="lg" variant="primary" @click="scanModal = true" ><i class="fa fa-barcode"></i> ESCANEAR </b-button>
              </div>
            </b-col>
            <b-col>
              <div class="text-center mb-4">
                <b-button v-show="addSessionVar" type="button" size="lg" variant="primary" @click="addModal = true" ><i class="fa fa-cube"></i> AGREGAR SIN ETIQUETA </b-button>
              </div>
            </b-col>
          </b-row>

          <b-table v-show="addSessionVar" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="lg" :items="tableitems" :fields="tablefields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
            <template slot="id" slot-scope="data">
              {{data.item.id}}
            </template>
            <template slot="keyfield" slot-scope="data">
              {{data.item.keyfield}}
            </template>
            <template slot="status" slot-scope="data">
              <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
            </template>
          </b-table>
          <nav>
            <b-pagination v-show="addSessionVar" size="sm" :total-rows="getRowCount(tableitems)" :per-page="perPage" v-model="currentPage" prev-text="Ant" next-text="Sig" hide-goto-end-buttons/>
          </nav>

          <div slot="footer" v-show="addSessionVar">
            <div class="pull-right">
              <b-button type="reset" size="sm" variant="secondary" @click="goBack" class="mr-1"><i class="fa fa-chevron-left"></i> Atras</b-button>
              <b-button v-show="addSessionVar" type="button" size="sm" variant="primary" @click="closeSession" :disabled="!formValidated"><i class="fa fa-stop"></i> Terminar</b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!--MODAL-->
    <b-modal title="Escanear activo" v-model="scanModal" @ok="scanAsset" ok-variant="primary" @cancel="cancelScan" cancel-title="Cancelar" ok-title="Guardar" ref="scanModal" @hide="cancelScan">
      <div>
        <b-row>
          <b-col>
            <div class="text-center mb-4">
              <b-button v-show="!scanBarcode" type="button" variant="primary" @click="scaner" ><i class="fa fa-camera"></i> Cámara para scanear código de barras </b-button>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-input-group v-show="!scanBarcode">
              <b-input-group-prepend>
                <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="text" id="keyfield" v-model="find.keyfield" placeholder="Introduce la clave"></b-form-input>
              <b-button type="button" variant="primary" @click="scaner" ><i class="fa fa-search"></i> Buscar </b-button>
            </b-input-group>
            <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
          </b-col>
        </b-row>
        <b-row v-show="scanBarcode">
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <label class="small muted" for="keyfield">Estatus</label>
                <strong> {{find.status}} </strong>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="find.keyfield" :disabled="true" placeholder="Introduce la clave"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="find.asset" placeholder="Introduce el activo"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="find.description" placeholder="Introduce la descripción"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="find.brand" placeholder="Introduce la marca"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="find.model" placeholder="Introduce el modelo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="find.serial" placeholder="Introduce el número de serie"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="find.cost" placeholder="Introduce el costo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="assetType">Tipo de activo</label>
                      <b-form-select id="assetType" v-model="find.assetType" 
                        :options="['Tipo de activo...', 'Mobiliario','Equipo','Maquinaria','Instrumental','Vehículo', 'Inmueble', 'Terreno', 'Bien natural', 'Otro']">
                      </b-form-select>
                  </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="department"
                      v-model="find.department"
                      class="form-control" :class="{ 'is-invalid': departmentValidationError }"
                      :options="departmentOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="sessionLocation"
                      v-model="find.location"
                      class="form-control" :class="{ 'is-invalid': locationValidationError }"
                      :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="find.locationDetail" placeholder="Introduce el detalle de la ubicación"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="find.comments" placeholder="Introduce comentarios adicionales"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-plus"></i></b-button>
                </div>
              </div>
              <div>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="0"
                            img-width="1024"
                            img-height="768"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >

                  <!-- Text slides with image -->
                  <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/2/"
                  ></b-carousel-slide>

                  <!-- Slides with custom text -->
                  <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/4/">
                  </b-carousel-slide>

                  <!-- Slides with image only -->
                  <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/8/">
                  </b-carousel-slide>
                </b-carousel>

                <p class="small muted mt-4">
                  Imagen: {{ slide + 1 }}
                </p>

              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <!--MODAL-->
    <b-modal title="Agregar activo sin etiqueta" v-model="addModal" @ok="addAsset" ok-variant="primary" cancel-title="Cancelar" ok-title="Guardar" ref="addModal" @hide="cancelAdd">
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <label class="small muted" for="keyfield">Estatus</label>
                <strong> {{nuevo.status}} </strong>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="nuevo.keyfield" :disabled="true" placeholder="Sin clave"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="nuevo.asset" placeholder="Introduce el activo"></b-form-input>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="nuevo.description" placeholder="Introduce la descripción"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.brand" placeholder="Introduce la marca"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="nuevo.model" placeholder="Introduce el modelo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="nuevo.serial" placeholder="Introduce el número de serie"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="nuevo.cost" placeholder="Introduce el costo"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="assetType">Tipo de activo</label>
                      <b-form-select id="assetType" v-model="nuevo.assetType" 
                        :options="['Tipo de activo...', 'Mobiliario','Equipo','Maquinaria','Instrumental','Vehículo', 'Inmueble', 'Terreno', 'Bien natural', 'Otro']">
                      </b-form-select>
                  </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="department"
                      v-model="nuevo.department"
                      class="form-control" :class="{ 'is-invalid': departmentValidationError }"
                      :options="departmentOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!departmentValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="sessionLocation"
                      v-model="nuevo.location"
                      class="form-control" :class="{ 'is-invalid': locationValidationError }"
                      :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                  <div class="small text-danger" v-if="!locationValidationRequired">Campo requerido</div>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="nuevo.locationDetail" placeholder="Introduce el detalle de la ubicación"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="nuevo.comments" placeholder="Introduce comentarios adicionales"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-plus"></i></b-button>
                </div>
              </div>
              <div>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="0"
                            img-width="1024"
                            img-height="768"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >

                  <!-- Text slides with image -->
                </b-carousel>

                <p class="small muted mt-4">
                  Imagen: {{ slide }}
                </p>

              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <!--MODAL-->
    <b-modal title="Detalle de activo" v-model="assetModal" ok-only ok-variant="secondary" ok-title="Cerrar">
      <div>
        <b-row>
          <b-col lg="12">
            <b-card>
              <div slot="header">
                <strong> {{ current.status }} </strong>
                <small> ID: {{ current.id }} </small>
                <small class="float-right text-muted">
                  ID Sesión: {{ sessionID }}
                </small>
              </div>
              <b-form>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-barcode" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="keyfield" v-model="current.keyfield" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-cube" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" id="asset" v-model="current.asset" :disabled="true"></b-form-input>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="description">Descripción</label>
                  <b-form-input type="text" id="description" v-model="current.description" :disabled="true"></b-form-input>
                </b-form-group>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="brand">Marca</label>
                      <b-form-input type="text" id="brand" v-model="current.brand" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="model">Modelo</label>
                      <b-form-input type="text" id="model" v-model="current.model" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="serial">Serie</label>
                      <b-form-input type="text" id="brand" v-model="current.serial" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col sm="6">
                    <b-form-group>
                      <label class="small muted" for="cost">Costo</label>
                      <b-form-input type="text" id="cost" v-model="current.cost" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="small muted" for="cost">Tipo de activo</label>
                      <b-form-input type="text" id="assetType" v-model="current.assetType" :disabled="true"></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-sitemap" ></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="department"
                      v-model="current.department"
                      class="form-control"
                      :disabled="true"
                      :options="departmentOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-building"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select id="location"
                      v-model="current.location"
                      class="form-control"
                      :disabled="true"
                      :options="locationOptions">
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="locationDetail">Detalles de la ubicación</label>
                  <b-form-input type="text" id="locationDetail" v-model="current.locationDetail" :disabled="true"></b-form-input>
                </b-form-group>
                <b-form-group>
                  <label class="small muted" for="comments">Comentarios</label>
                  <b-form-input type="text" id="comments" v-model="current.comments" :disabled="true"></b-form-input>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>

          <b-col lg="12">
            <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <i class="fa fa-align-justify"></i><strong> Imágenes del activo</strong>
                <div class="card-header-actions">
                  <b-button type="button" variant="primary" class="float-right" size="sm"><i class="fa fa-cloud-download"></i></b-button>
                </div>
              </div>
              <div>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="0"
                            img-width="1024"
                            img-height="768"
                            v-model="slide"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                >

                  <!-- Text slides with image -->
                  <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/2/"
                  ></b-carousel-slide>

                  <!-- Slides with custom text -->
                  <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/4/">
                  </b-carousel-slide>

                  <!-- Slides with image only -->
                  <b-carousel-slide img-src="https://lorempixel.com/1024/768/technics/8/">
                  </b-carousel-slide>
                </b-carousel>

                <p class="small muted mt-4">
                  Imagen: {{ slide + 1 }}
                </p>

              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>

  </div>
  
</template>

<script>
import sessionsData from './SessionsData'
import assetsData from './AssetsData'
export default {
  name: 'AddSession',
  props: {
    caption: {
      type: String,
      default: 'Nueva sesión de registro'
    },
    hover: {
      type: Boolean,
      default: true
    },
      striped: {
      type: Boolean,
      default: false
    },
      bordered: {
      type: Boolean,
      default: false
    },
      small: {
      type: Boolean,
      default: false
    },
      fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      scanModal: false,   //Modal para escanear
      addModal: false,    //Modal para agregar sin etiqueta
      assetModal: false,  //Modal para detalle de activo
      itemSelected: 0,
      sessionID: 17,
      slide: 0,
      userName: 'Ana Sánchez',
      addSessionVar: false,
      scanBarcode: false,
      department: null,
      departmentOptions: [
        {value: null, text: 'Departamento...', disabled: true},
        {value: 1001, text: 'Cancerología'},
        {value: 1002, text: 'Dirección General'},
        {value: 2001, text: 'Enfermería'},
        {value: 2002, text: 'Especialidades'},
        {value: 2003, text: 'Ginecología'},
        {value: 3001, text: 'Inventarios'},
        {value: 3002, text: 'Legales'},
        {value: 3003, text: 'Psiquiatría'},
        {value: 4001, text: 'Seguridad'},
        {value: 4002, text: 'Soporte'}
      ],
      location: null,
      locationOptions: [
        {value: null, text: 'Ubicación...', disabled: true},
        {value: 116, text: 'Edificio 16'},
        {value: 123, text: 'Edificio 23'},
        {value: 100, text: 'Edificio de Gobierno'},
        {value: 200, text: 'Laboratorios'},
        {value: 300, text: 'Torre A'},
        {value: 400, text: 'Torre B'},
        {value: 500, text: 'Torre C'},
        {value: 600, text: 'Torre D'},
        {value: 700, text: 'Torre E'}
      ],
      items: (id) => {
        const session = sessionsData.find( session => session.id.toString() === id)
        return session
      },
      fields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Inicio', key: 'creationDateTime', sortable: true},
        {label: 'Fin', key: 'finalDateTime', sortable: true},
        {label: 'Usuario', key: 'userName', sortable: true},
        {label: 'Departamento', key: 'sessionDepartmentName', sortable: true},
        {label: 'Ubicación', key: 'sessionLocationName', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      find: {
        id: 0, keyfield: 'HGM0012345', asset: 'Silla', description: 'Silla de madera', brand: 'ND', model: 'ND', serial:'ND', cost: '180.00', assetType: 'Mobiliario', locationDetail: '', comments: '', status: 'Conciliado'
      },
      nuevo: {
        id: 0, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: 'En demasía'
      },
      current: {
        id: 0, keyfield: '', asset: '', description: '', brand: '', model: '', serial:'', cost: '', assetType: '', locationDetail: '', comments: '', status: ''
      },
      tableitems:  [],
      tablefields: [
        {label: 'ID', key: 'id', sortable: true},
        {label: 'Clave', key: 'keyfield', sortable: true},
        {label: 'Activo', key: 'asset', sortable: true},
        {label: 'Descripción', key: 'description', sortable: true},
        {label: 'Costo', key: 'cost', sortable: true},
        {label: 'Tipo', key: 'assetType', sortable: true},
        {label: 'Estatus', key: 'status', sortable: true}
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
    }
  },
  computed: {
  	formValidated: function() {
      var form_validate = false
      if (this.departmentValidationRequired && this.locationValidationRequired) {
        form_validate = true
      }
      return form_validate
    },
    departmentValidationError: function() {
      var department_error = true
      if (this.department) {
        department_error = false
      }
      return department_error
    },
    departmentValidationRequired: function() {
      var department_required = false
      if (this.department) {
        department_required = true
      }
      return department_required
    },
    locationValidationError: function() {
      var location_error = true
      if (this.location) {
        location_error = false
      }
      return location_error
    },
    locationValidationRequired: function() {
      var location_required = false
      if (this.location) {
        location_required = true
      }
      return location_required
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getBadge (status) {
      return status === 'Conciliado' ? 'success'
      : status === 'Cambio de despartamento' ? 'primary'
      : status === 'Cambio de ubicación' ? 'primary'
      : status === 'Cambio de activo' ? 'primary'
      : status === 'En demasía' ? 'warning'
      : status === 'No inventariado' ? 'danger' : 'primary'
    },
    getRowCount (item) {
      return item.length
    },
    regLink (idsession,id) {
      return `session/sessionID/asset/${id.toString()}`
    },
    rowClicked (item) {
      this.itemSelected = item.id - 1
      this.current = this.tableitems[this.itemSelected]
      this.assetModal = true
    },
    addSessionClicked () {
      this.addSessionVar = true
      this.find.department = this.department
      this.find.location = this.location
      this.nuevo.department = this.department
      this.nuevo.location = this.location
    },
    scaner () {
      this.scanBarcode = true
    },
    scanAsset () {
      this.find.id = this.tableitems.length + 1
      this.tableitems.push(
        {
          id : this.find.id,
          keyfield : this.find.keyfield,
          asset : this.find.asset,
          description : this.find.description,
          brand : this.find.brand,
          model : this.find.model,
          serial : this.find.serial,
          cost : this.find.cost,
          assetType : this.find.assetType,
          department : this.find.department,
          location : this.find.location,
          locationDetail : this.find.locationDetail,
          comments : this.find.comments,
          status : this.find.status
        }
      )
      this.scanBarcode = false
    },
    addAsset () {
      this.nuevo.id = this.tableitems.length + 1
      this.tableitems.push(
        {
          id : this.nuevo.id,
          asset : this.nuevo.asset,
          description : this.nuevo.description,
          brand : this.nuevo.brand,
          model : this.nuevo.model,
          serial : this.nuevo.serial,
          cost : this.nuevo.cost,
          assetType : this.nuevo.assetType,
          department : this.nuevo.department,
          location : this.nuevo.location,
          locationDetail : this.nuevo.locationDetail,
          comments : this.nuevo.comments,
          status : this.nuevo.status
        }
      )
      this.scanBarcode = false
      this.nuevo.id = '',
      this.nuevo.asset = '',
      this.nuevo.description = '',
      this.nuevo.brand = '',
      this.nuevo.model = '',
      this.nuevo.serial = '',
      this.nuevo.cost = '',
      this.nuevo.assetType = '',
      this.nuevo.department = this.department,
      this.nuevo.location = this.location,
      this.nuevo.locationDetail = '',
      this.nuevo.comments = '',
      this.nuevo.status = 'En demasía'
    },
    cancelScan () {
      this.scanBarcode = false
    },
    cancelAdd () {
      
    },
    closeSession () {

    },
    onSlideStart (slide) {
      console.log('onSlideStart', slide)
      this.sliding = true
    },
    onSlideEnd (slide) {
      console.log('onSlideEnd', slide)
      this.sliding = false
    }
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
